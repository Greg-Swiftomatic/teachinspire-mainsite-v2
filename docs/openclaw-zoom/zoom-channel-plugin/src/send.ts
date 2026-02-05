import type { OpenClawConfig } from "openclaw/plugin-sdk";
import { resolveZoomAccount } from "./accounts.js";
import { sendZoomMessage } from "./api.js";
import { ZoomTokenManager } from "./oauth.js";

export async function sendZoomText(params: {
  cfg: OpenClawConfig;
  to: string;
  text: string;
  accountId?: string | null;
}): Promise<{ ok: boolean; messageId: string; error?: Error }> {
  try {
    const account = resolveZoomAccount({
      cfg: params.cfg,
      accountId: params.accountId,
    });

    const target = params.to.trim() || account.config.defaultChannel?.trim();

    if (!target) {
      throw new Error("Zoom target is missing. Provide to or configure defaultChannel.");
    }

    const tokenManager = new ZoomTokenManager(account);

    await sendZoomMessage({
      tokenManager,
      toJid: target,
      message: params.text,
      options: {
        isMarkdown: true,
      },
    });

    return {
      ok: true,
      messageId: "",
    };
  } catch (error) {
    return {
      ok: false,
      messageId: "",
      error: error instanceof Error ? error : new Error(String(error)),
    };
  }
}
