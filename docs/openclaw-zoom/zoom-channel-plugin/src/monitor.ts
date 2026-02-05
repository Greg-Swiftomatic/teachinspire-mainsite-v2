import { createHmac } from "node:crypto";
import type { IncomingMessage, ServerResponse } from "node:http";
import type { OpenClawConfig } from "openclaw/plugin-sdk";
import { createReplyPrefixOptions } from "openclaw/plugin-sdk";
import { sendZoomMessage } from "./api.js";
import { ZoomTokenManager } from "./oauth.js";
import { getZoomRuntime } from "./runtime.js";
import type { ResolvedZoomAccount, ZoomWebhookEvent, ZoomWebhookPayload } from "./types.js";

type ZoomRuntimeEnv = {
  log?: (message: string) => void;
  error?: (message: string) => void;
};

type ZoomWebhookTarget = {
  account: ResolvedZoomAccount;
  config: OpenClawConfig;
  runtime: ZoomRuntimeEnv;
  path: string;
  tokenManager: ZoomTokenManager;
  statusSink?: (patch: { lastInboundAt?: number; lastOutboundAt?: number }) => void;
};

const webhookTargets = new Map<string, ZoomWebhookTarget[]>();

function normalizePath(raw: string): string {
  const trimmed = raw.trim();
  if (!trimmed) {
    return "/";
  }
  const withSlash = trimmed.startsWith("/") ? trimmed : `/${trimmed}`;
  if (withSlash.length > 1 && withSlash.endsWith("/")) {
    return withSlash.slice(0, -1);
  }
  return withSlash;
}

async function readJsonBody(req: IncomingMessage, maxBytes: number) {
  const chunks: Buffer[] = [];
  let total = 0;

  return await new Promise<{ ok: boolean; value?: unknown; error?: string }>((resolve) => {
    req.on("data", (chunk: Buffer) => {
      total += chunk.length;
      if (total > maxBytes) {
        resolve({ ok: false, error: "payload too large" });
        req.destroy();
        return;
      }
      chunks.push(chunk);
    });

    req.on("end", () => {
      try {
        const raw = Buffer.concat(chunks).toString("utf8");
        if (!raw.trim()) {
          resolve({ ok: false, error: "empty payload" });
          return;
        }
        resolve({ ok: true, value: JSON.parse(raw) as unknown });
      } catch (error) {
        resolve({ ok: false, error: error instanceof Error ? error.message : String(error) });
      }
    });

    req.on("error", (error) => {
      resolve({ ok: false, error: error instanceof Error ? error.message : String(error) });
    });
  });
}

function verificationTokenMatches(event: ZoomWebhookEvent, target: ZoomWebhookTarget): boolean {
  const expected = target.account.config.verificationToken?.trim();
  if (!expected) {
    return true;
  }

  const candidates = [event.token, event.payload?.token]
    .map((value) => value?.trim())
    .filter((value): value is string => Boolean(value));

  if (candidates.length === 0) {
    return false;
  }

  return candidates.includes(expected);
}

function writeJson(res: ServerResponse, code: number, body: unknown): void {
  res.statusCode = code;
  res.setHeader("Content-Type", "application/json");
  res.end(JSON.stringify(body));
}

function resolveReplyTarget(payload: ZoomWebhookPayload, account: ResolvedZoomAccount): string | null {
  const target =
    payload.channelJid?.trim() ||
    payload.channelId?.trim() ||
    payload.userJid?.trim() ||
    account.config.defaultChannel?.trim();
  return target || null;
}

function resolveConversationPeer(payload: ZoomWebhookPayload): { kind: "dm" | "group"; id: string } {
  const groupId = payload.channelJid?.trim() || payload.channelId?.trim() || payload.channelName?.trim();
  if (groupId) {
    return { kind: "group", id: groupId };
  }
  return { kind: "dm", id: payload.userId?.trim() || payload.userJid?.trim() || "unknown" };
}

async function processZoomNotification(event: ZoomWebhookEvent, target: ZoomWebhookTarget): Promise<void> {
  const payload = event.payload;
  if (!payload) {
    return;
  }

  const text = payload.message?.text?.trim();
  if (!text) {
    return;
  }

  const core = getZoomRuntime();
  const peer = resolveConversationPeer(payload);

  const route = core.channel.routing.resolveAgentRoute({
    cfg: target.config,
    channel: "zoom",
    accountId: target.account.accountId,
    peer,
  });

  const storePath = core.channel.session.resolveStorePath(target.config.session?.store, {
    agentId: route.agentId,
  });

  const envelopeOptions = core.channel.reply.resolveEnvelopeFormatOptions(target.config);

  const previousTimestamp = core.channel.session.readSessionUpdatedAt({
    storePath,
    sessionKey: route.sessionKey,
  });

  const sender = payload.name?.trim() || payload.userId?.trim() || payload.userJid?.trim() || "zoom-user";

  const formattedBody = core.channel.reply.formatAgentEnvelope({
    channel: "Zoom",
    from: sender,
    previousTimestamp,
    envelope: envelopeOptions,
    body: text,
  });

  const replyTarget = resolveReplyTarget(payload, target.account);

  const ctxPayload = core.channel.reply.finalizeInboundContext({
    Body: formattedBody,
    RawBody: text,
    CommandBody: text,
    From: payload.userId ? `zoom:${payload.userId}` : payload.userJid ? `zoom:${payload.userJid}` : "zoom:unknown",
    To: replyTarget ? `zoom:${replyTarget}` : "zoom:unknown",
    SessionKey: route.sessionKey,
    AccountId: route.accountId,
    ChatType: peer.kind === "group" ? "group" : "direct",
    ConversationLabel: payload.channelName || sender,
    SenderName: payload.name,
    SenderId: payload.userId || payload.userJid,
    Provider: "zoom",
    Surface: "zoom",
    MessageSid: payload.ts ? String(payload.ts) : undefined,
    OriginatingChannel: "zoom",
    OriginatingTo: replyTarget ? `zoom:${replyTarget}` : undefined,
  });

  await core.channel.session.recordInboundSession({
    storePath,
    sessionKey: ctxPayload.SessionKey ?? route.sessionKey,
    ctx: ctxPayload,
    onRecordError: (error) => {
      target.runtime.error?.(`[zoom] failed updating session meta: ${String(error)}`);
    },
  });

  const { onModelSelected, ...prefixOptions } = createReplyPrefixOptions({
    cfg: target.config,
    agentId: route.agentId,
    channel: "zoom",
    accountId: target.account.accountId,
  });

  await core.channel.reply.dispatchReplyWithBufferedBlockDispatcher({
    ctx: ctxPayload,
    cfg: target.config,
    dispatcherOptions: {
      ...prefixOptions,
      deliver: async (payload) => {
        const outboundText = payload.text?.trim();
        if (!outboundText) {
          return;
        }

        if (!replyTarget) {
          throw new Error("Zoom reply target is missing (channelJid/userJid/defaultChannel)");
        }

        await sendZoomMessage({
          tokenManager: target.tokenManager,
          toJid: replyTarget,
          message: outboundText,
          options: { isMarkdown: true },
        });

        target.statusSink?.({ lastOutboundAt: Date.now() });
      },
      onError: (error, info) => {
        target.runtime.error?.(
          `[${target.account.accountId}] zoom ${info.kind} reply failed: ${String(error)}`,
        );
      },
    },
    replyOptions: {
      onModelSelected,
    },
  });
}

export function registerZoomWebhookTarget(target: ZoomWebhookTarget): () => void {
  const key = normalizePath(target.path);
  const normalizedTarget = { ...target, path: key };

  const existing = webhookTargets.get(key) ?? [];
  webhookTargets.set(key, [...existing, normalizedTarget]);

  return () => {
    const updated = (webhookTargets.get(key) ?? []).filter((entry) => entry !== normalizedTarget);
    if (updated.length > 0) {
      webhookTargets.set(key, updated);
      return;
    }
    webhookTargets.delete(key);
  };
}

export async function handleZoomWebhookRequest(
  req: IncomingMessage,
  res: ServerResponse,
): Promise<boolean> {
  const url = new URL(req.url ?? "/", "http://localhost");
  const path = normalizePath(url.pathname);

  const targets = webhookTargets.get(path);
  if (!targets || targets.length === 0) {
    return false;
  }

  if (req.method === "GET") {
    const challenge = url.searchParams.get("challenge");
    if (challenge) {
      writeJson(res, 200, { challenge });
      return true;
    }

    res.statusCode = 200;
    res.end("ok");
    return true;
  }

  if (req.method !== "POST") {
    res.statusCode = 405;
    res.setHeader("Allow", "GET, POST");
    res.end("Method Not Allowed");
    return true;
  }

  const parsed = await readJsonBody(req, 1024 * 1024);
  if (!parsed.ok) {
    res.statusCode = parsed.error === "payload too large" ? 413 : 400;
    res.end(parsed.error ?? "invalid payload");
    return true;
  }

  const body = parsed.value as ZoomWebhookEvent;

  const accountId = body.payload?.accountId?.trim();

  const candidateTargets = targets.filter((target) => {
    const configuredAccountId = target.account.config.accountId?.trim();
    if (!configuredAccountId || !accountId) {
      return true;
    }
    return configuredAccountId === accountId;
  });

  const selectedTarget = candidateTargets.find((target) => verificationTokenMatches(body, target));

  if (!selectedTarget) {
    res.statusCode = 401;
    res.end("unauthorized");
    return true;
  }

  if (body.event === "endpoint.url_validation") {
    const plainToken = body.payload?.plainToken?.trim() || body.challenge?.trim();
    const verificationToken = selectedTarget.account.config.verificationToken?.trim();

    if (!plainToken || !verificationToken) {
      writeJson(res, 400, { error: "missing plainToken or verificationToken" });
      return true;
    }

    const encryptedToken = createHmac("sha256", verificationToken).update(plainToken).digest("hex");
    writeJson(res, 200, {
      plainToken,
      encryptedToken,
    });
    return true;
  }

  if (body.event !== "bot_notification") {
    writeJson(res, 200, { ok: true, ignored: true });
    return true;
  }

  selectedTarget.statusSink?.({ lastInboundAt: Date.now() });

  processZoomNotification(body, selectedTarget).catch((error) => {
    selectedTarget.runtime.error?.(
      `[${selectedTarget.account.accountId}] zoom webhook failed: ${String(error)}`,
    );
  });

  writeJson(res, 200, { ok: true });
  return true;
}
