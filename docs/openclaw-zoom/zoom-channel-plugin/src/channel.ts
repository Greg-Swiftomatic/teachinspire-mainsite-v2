import {
  applyAccountNameToChannelSection,
  buildChannelConfigSchema,
  DEFAULT_ACCOUNT_ID,
  deleteAccountFromConfigSection,
  formatPairingApproveHint,
  setAccountEnabledInConfigSection,
  type ChannelPlugin,
  type ChannelStatusIssue,
} from "openclaw/plugin-sdk";
import type { OpenClawConfig } from "openclaw/plugin-sdk";
import { resolveDefaultZoomAccountId, listZoomAccountIds, normalizeZoomAccountId, resolveZoomAccount } from "./accounts.js";
import { probeZoomCredentials } from "./api.js";
import { ZoomConfigSchema } from "./config-schema.js";
import { registerZoomWebhookTarget } from "./monitor.js";
import { ZoomTokenManager } from "./oauth.js";
import { sendZoomText } from "./send.js";
import type { ResolvedZoomAccount, ZoomProbe } from "./types.js";

const meta = {
  id: "zoom",
  label: "Zoom",
  selectionLabel: "Zoom Team Chat",
  detailLabel: "Zoom Bot",
  docsPath: "/channels/zoom",
  docsLabel: "zoom",
  blurb: "Zoom Team Chat bot via webhook + REST API",
  aliases: ["zoom-chat"],
  order: 58,
  quickstartAllowFrom: true,
};

function normalizeAllowEntry(entry: string): string {
  return entry.replace(/^zoom:/i, "").trim().toLowerCase();
}

export const zoomPlugin: ChannelPlugin<ResolvedZoomAccount, ZoomProbe> = {
  id: "zoom",
  meta,

  pairing: {
    idLabel: "zoomUserId",
    normalizeAllowEntry,
    notifyApproval: async ({ cfg, id, accountId }) => {
      const account = resolveZoomAccount({ cfg, accountId });
      const tokenManager = new ZoomTokenManager(account);
      const message = "OpenClaw: your access has been approved.";
      const toJid = id;

      await import("./api.js").then(({ sendZoomMessage }) =>
        sendZoomMessage({ tokenManager, toJid, message, options: { isMarkdown: false } }),
      );
    },
  },

  capabilities: {
    chatTypes: ["direct", "group"],
    media: false,
    reactions: false,
    threads: false,
    polls: false,
    nativeCommands: false,
    blockStreaming: true,
  },

  reload: { configPrefixes: ["channels.zoom"] },

  configSchema: buildChannelConfigSchema(ZoomConfigSchema),

  config: {
    listAccountIds: (cfg) => listZoomAccountIds(cfg),
    resolveAccount: (cfg, accountId) => resolveZoomAccount({ cfg, accountId }),
    defaultAccountId: (cfg) => resolveDefaultZoomAccountId(cfg),

    setAccountEnabled: ({ cfg, accountId, enabled }) =>
      setAccountEnabledInConfigSection({
        cfg,
        sectionKey: "zoom",
        accountId,
        enabled,
        allowTopLevel: true,
      }),

    deleteAccount: ({ cfg, accountId }) =>
      deleteAccountFromConfigSection({
        cfg,
        sectionKey: "zoom",
        accountId,
        clearBaseFields: [
          "clientId",
          "clientSecret",
          "botJid",
          "verificationToken",
          "accountId",
          "accessToken",
          "refreshToken",
          "defaultChannel",
          "name",
        ],
      }),

    isConfigured: (account) =>
      Boolean(
        account.config.clientId?.trim() &&
          account.config.clientSecret?.trim() &&
          account.config.botJid?.trim() &&
          account.config.accountId?.trim() &&
          (account.config.accessToken?.trim() || account.config.refreshToken?.trim()),
      ),

    describeAccount: (account) => ({
      accountId: account.accountId,
      name: account.name,
      enabled: account.enabled,
      configured: Boolean(
        account.config.clientId?.trim() &&
          account.config.clientSecret?.trim() &&
          account.config.botJid?.trim() &&
          account.config.accountId?.trim(),
      ),
      tokenSource: account.tokenSource,
    }),

    resolveAllowFrom: ({ cfg, accountId }) =>
      (resolveZoomAccount({ cfg, accountId }).config.allowFrom ?? []).map((entry) => String(entry)),

    formatAllowFrom: ({ allowFrom }) =>
      allowFrom
        .map((entry) => String(entry).trim())
        .filter(Boolean)
        .map((entry) => (entry === "*" ? entry : normalizeAllowEntry(entry))),
  },

  security: {
    resolveDmPolicy: ({ cfg, accountId, account }) => {
      const resolvedAccountId = accountId ?? account.accountId ?? DEFAULT_ACCOUNT_ID;
      const useAccountPath = Boolean(cfg.channels?.zoom?.accounts?.[resolvedAccountId]);
      const basePath = useAccountPath
        ? `channels.zoom.accounts.${resolvedAccountId}.`
        : "channels.zoom.";

      return {
        policy: account.config.dmPolicy ?? "pairing",
        allowFrom: account.config.allowFrom ?? [],
        policyPath: `${basePath}dmPolicy`,
        allowFromPath: basePath,
        approveHint: formatPairingApproveHint("zoom"),
        normalizeEntry: normalizeAllowEntry,
      };
    },

    collectWarnings: ({ account, cfg }) => {
      const defaultGroupPolicy = cfg.channels?.defaults?.groupPolicy;
      const groupPolicy = account.config.groupPolicy ?? defaultGroupPolicy ?? "allowlist";

      if (groupPolicy !== "open") {
        return [];
      }

      return [
        `- Zoom groups: groupPolicy="open" allows any member in group chats to trigger. Set channels.zoom.groupPolicy="allowlist" + channels.zoom.groupAllowFrom to restrict senders.`,
      ];
    },
  },

  messaging: {
    normalizeTarget: (target) => {
      const trimmed = target.trim();
      if (!trimmed) {
        return null;
      }
      return trimmed.replace(/^zoom:/i, "");
    },

    targetResolver: {
      looksLikeId: (id) => {
        const trimmed = id?.trim();
        if (!trimmed) {
          return false;
        }
        return trimmed.includes("@xmpp.zoom.us") || /^zoom:/i.test(trimmed);
      },
      hint: "<channel-jid|user-jid>",
    },
  },

  directory: {
    self: async () => null,
    listPeers: async () => [],
    listGroups: async () => [],
  },

  setup: {
    resolveAccountId: ({ accountId }) => normalizeZoomAccountId(accountId),

    applyAccountName: ({ cfg, accountId, name }) =>
      applyAccountNameToChannelSection({
        cfg,
        channelKey: "zoom",
        accountId,
        name,
      }),

    validateInput: ({ accountId, input }) => {
      if (input.useEnv && accountId !== DEFAULT_ACCOUNT_ID) {
        return "ZOOM_* env vars can only be used for the default account.";
      }
      if (!input.useEnv && !input.token && !input.accessToken) {
        return "Zoom setup requires an access token (or --use-env).";
      }
      return null;
    },

    applyAccountConfig: ({ cfg, accountId, input }) => {
      const namedCfg = applyAccountNameToChannelSection({
        cfg,
        channelKey: "zoom",
        accountId,
        name: input.name,
      });

      const next: OpenClawConfig = {
        ...namedCfg,
        channels: {
          ...namedCfg.channels,
          zoom: {
            ...namedCfg.channels?.zoom,
            enabled: true,
            accounts: {
              ...namedCfg.channels?.zoom?.accounts,
              [accountId]: {
                ...namedCfg.channels?.zoom?.accounts?.[accountId],
                enabled: true,
              },
            },
          },
        },
      };

      return next;
    },
  },

  outbound: {
    deliveryMode: "direct",
    chunkerMode: "text",
    textChunkLimit: 3500,

    sendText: async ({ to, text, accountId, cfg }) => {
      const result = await sendZoomText({
        cfg,
        to,
        text,
        accountId,
      });

      return {
        channel: "zoom",
        ok: result.ok,
        messageId: result.messageId,
        error: result.error,
      };
    },
  },

  status: {
    defaultRuntime: {
      accountId: DEFAULT_ACCOUNT_ID,
      running: false,
      lastStartAt: null,
      lastStopAt: null,
      lastError: null,
    },

    collectStatusIssues: (accounts) => {
      const issues: ChannelStatusIssue[] = [];

      for (const account of accounts) {
        if (!account.configured) {
          issues.push({
            channel: "zoom",
            accountId: account.accountId,
            kind: "config",
            message: "Zoom channel missing required credentials",
          });
        }
      }

      return issues;
    },

    buildChannelSummary: ({ snapshot }) => ({
      configured: snapshot.configured ?? false,
      tokenSource: snapshot.tokenSource ?? "none",
      running: snapshot.running ?? false,
      lastStartAt: snapshot.lastStartAt ?? null,
      lastStopAt: snapshot.lastStopAt ?? null,
      lastError: snapshot.lastError ?? null,
      probe: snapshot.probe,
      lastProbeAt: snapshot.lastProbeAt ?? null,
    }),

    probeAccount: async ({ account }) => {
      const tokenManager = new ZoomTokenManager(account);
      return probeZoomCredentials(tokenManager);
    },

    buildAccountSnapshot: ({ account, runtime, probe }) => ({
      accountId: account.accountId,
      name: account.name,
      enabled: account.enabled,
      configured: Boolean(
        account.config.clientId?.trim() &&
          account.config.clientSecret?.trim() &&
          account.config.botJid?.trim() &&
          account.config.accountId?.trim(),
      ),
      tokenSource: account.tokenSource,
      running: runtime?.running ?? false,
      lastStartAt: runtime?.lastStartAt ?? null,
      lastStopAt: runtime?.lastStopAt ?? null,
      lastError: runtime?.lastError ?? null,
      probe,
      lastInboundAt: runtime?.lastInboundAt ?? null,
      lastOutboundAt: runtime?.lastOutboundAt ?? null,
    }),
  },

  gateway: {
    startAccount: async (ctx) => {
      const account = ctx.account;
      const tokenManager = new ZoomTokenManager(account);

      ctx.log?.info(`[${account.accountId}] starting Zoom webhook monitor`);

      const unregister = registerZoomWebhookTarget({
        account,
        config: ctx.cfg,
        runtime: ctx.runtime,
        path: account.config.webhookPath || "/zoom/webhook",
        tokenManager,
        statusSink: (patch) => ctx.setStatus({ accountId: ctx.accountId, ...patch }),
      });

      return {
        stop: () => {
          unregister();
        },
      };
    },
  },
};
