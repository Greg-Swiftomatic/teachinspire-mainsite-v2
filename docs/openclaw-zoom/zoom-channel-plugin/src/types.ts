import type { OpenClawConfig, ToolPolicy } from "openclaw/plugin-sdk";

export type ZoomAtItem = {
  at_contact: string;
  at_type: number;
};

export type ZoomSendOptions = {
  isMarkdown?: boolean;
  atItems?: ZoomAtItem[];
};

export type ZoomWebhookMessage = {
  text?: string;
};

export type ZoomWebhookPayload = {
  accountId?: string;
  channelName?: string;
  channelId?: string;
  channelJid?: string;
  toJid?: string;
  userId?: string;
  userJid?: string;
  cmd?: string;
  name?: string;
  robotJid?: string;
  token?: string;
  ts?: number | string;
  message?: ZoomWebhookMessage;
  plainToken?: string;
};

export type ZoomWebhookEvent = {
  event?: string;
  token?: string;
  challenge?: string;
  payload?: ZoomWebhookPayload;
};

export type ZoomAccountConfig = {
  name?: string;
  enabled?: boolean;
  clientId?: string;
  clientSecret?: string;
  botJid?: string;
  verificationToken?: string;
  accountId?: string;
  defaultChannel?: string;
  accessToken?: string;
  refreshToken?: string;
  tokenExpiresAt?: number;
  webhookPath?: string;
  requestTimeoutMs?: number;
  dmPolicy?: "pairing" | "allowlist" | "open" | "disabled";
  groupPolicy?: "open" | "allowlist" | "disabled";
  allowFrom?: Array<string | number>;
  groupAllowFrom?: Array<string | number>;
  historyLimit?: number;
  dmHistoryLimit?: number;
  textChunkLimit?: number;
  blockStreaming?: boolean;
  tools?: ToolPolicy;
};

export type ZoomConfig = ZoomAccountConfig & {
  accounts?: Record<string, ZoomAccountConfig>;
};

export type ResolvedZoomAccount = {
  accountId: string;
  name?: string;
  enabled: boolean;
  config: Required<
    Pick<ZoomAccountConfig, "webhookPath" | "requestTimeoutMs" | "dmPolicy" | "groupPolicy">
  > &
    ZoomAccountConfig;
  tokenSource: "config" | "env" | "none";
};

export type ZoomProbe = {
  ok: boolean;
  detail?: string;
};

export type ZoomCoreConfig = OpenClawConfig & {
  channels?: OpenClawConfig["channels"] & {
    zoom?: ZoomConfig;
  };
};
