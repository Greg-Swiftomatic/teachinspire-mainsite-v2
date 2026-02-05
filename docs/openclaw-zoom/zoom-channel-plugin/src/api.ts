import { ZoomTokenManager } from "./oauth.js";
import type { ZoomAtItem, ZoomProbe, ZoomSendOptions } from "./types.js";

const ZOOM_CHAT_MESSAGES_URL = "https://api.zoom.us/v2/im/chat/messages";
const ZOOM_ME_URL = "https://api.zoom.us/v2/users/me";

type SendZoomMessageParams = {
  tokenManager: ZoomTokenManager;
  toJid: string;
  message: string;
  options?: ZoomSendOptions;
};

function buildBody(text: string, atItems?: ZoomAtItem[]) {
  const messageBlock: Record<string, unknown> = {
    type: "message",
    text,
  };

  if (atItems && atItems.length > 0) {
    messageBlock.at_items = atItems;
  }

  return [messageBlock];
}

export async function sendZoomMessage(params: SendZoomMessageParams): Promise<void> {
  const { tokenManager, toJid, message, options } = params;

  const account = tokenManager.getAccount();
  const botJid = account.config.botJid?.trim();
  const accountId = account.config.accountId?.trim();
  const target = toJid.trim();

  if (!botJid) {
    throw new Error("Zoom botJid is not configured");
  }

  if (!accountId) {
    throw new Error("Zoom accountId is not configured");
  }

  if (!target) {
    throw new Error("Zoom target JID is required");
  }

  const accessToken = await tokenManager.getAccessToken();

  const response = await fetch(ZOOM_CHAT_MESSAGES_URL, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      robot_jid: botJid,
      to_jid: target,
      account_id: accountId,
      content: {
        body: buildBody(message, options?.atItems),
      },
      is_markdown_support: options?.isMarkdown ?? false,
    }),
  });

  if (!response.ok) {
    const detail = await response.text().catch(() => "");
    throw new Error(`Zoom send failed (${response.status}): ${detail || response.statusText}`);
  }
}

export async function probeZoomCredentials(tokenManager: ZoomTokenManager): Promise<ZoomProbe> {
  try {
    const token = await tokenManager.getAccessToken();
    const response = await fetch(ZOOM_ME_URL, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      const detail = await response.text().catch(() => "");
      return {
        ok: false,
        detail: `Probe failed (${response.status}): ${detail || response.statusText}`,
      };
    }

    return { ok: true, detail: "Zoom credentials valid" };
  } catch (error) {
    return {
      ok: false,
      detail: error instanceof Error ? error.message : String(error),
    };
  }
}
