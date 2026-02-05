import { DEFAULT_ACCOUNT_ID, normalizeAccountId, type OpenClawConfig } from "openclaw/plugin-sdk";
import type { ResolvedZoomAccount, ZoomAccountConfig, ZoomConfig, ZoomCoreConfig } from "./types.js";

const DEFAULT_WEBHOOK_PATH = "/zoom/webhook";
const DEFAULT_TIMEOUT_MS = 15000;

type EnvKeys = {
  clientId: string;
  clientSecret: string;
  botJid: string;
  verificationToken: string;
  accountId: string;
  accessToken: string;
  refreshToken: string;
};

const ENV_KEYS: EnvKeys = {
  clientId: "ZOOM_CLIENT_ID",
  clientSecret: "ZOOM_CLIENT_SECRET",
  botJid: "ZOOM_BOT_JID",
  verificationToken: "ZOOM_VERIFICATION_TOKEN",
  accountId: "ZOOM_ACCOUNT_ID",
  accessToken: "ZOOM_ACCESS_TOKEN",
  refreshToken: "ZOOM_REFRESH_TOKEN",
};

function getZoomConfig(cfg: OpenClawConfig): ZoomConfig {
  return ((cfg as ZoomCoreConfig).channels?.zoom ?? {}) as ZoomConfig;
}

function envValue(key: string): string | undefined {
  const value = process.env[key]?.trim();
  return value ? value : undefined;
}

function mergeAccountConfig(
  top: ZoomConfig,
  accountSection: ZoomAccountConfig | undefined,
  accountId: string,
): ZoomAccountConfig {
  return {
    ...top,
    ...accountSection,
    webhookPath: accountSection?.webhookPath ?? top.webhookPath ?? DEFAULT_WEBHOOK_PATH,
    requestTimeoutMs: accountSection?.requestTimeoutMs ?? top.requestTimeoutMs ?? DEFAULT_TIMEOUT_MS,
    dmPolicy: accountSection?.dmPolicy ?? top.dmPolicy ?? "pairing",
    groupPolicy: accountSection?.groupPolicy ?? top.groupPolicy ?? "allowlist",
    accountId: accountSection?.accountId ?? top.accountId,
    name: accountSection?.name ?? top.name ?? (accountId === DEFAULT_ACCOUNT_ID ? "Zoom" : accountId),
  };
}

function withEnvFallback(config: ZoomAccountConfig, accountId: string): ZoomAccountConfig {
  // Keep env fallback for default account only to avoid accidental cross-account leakage.
  if (accountId !== DEFAULT_ACCOUNT_ID) {
    return config;
  }

  return {
    ...config,
    clientId: config.clientId ?? envValue(ENV_KEYS.clientId),
    clientSecret: config.clientSecret ?? envValue(ENV_KEYS.clientSecret),
    botJid: config.botJid ?? envValue(ENV_KEYS.botJid),
    verificationToken: config.verificationToken ?? envValue(ENV_KEYS.verificationToken),
    accountId: config.accountId ?? envValue(ENV_KEYS.accountId),
    accessToken: config.accessToken ?? envValue(ENV_KEYS.accessToken),
    refreshToken: config.refreshToken ?? envValue(ENV_KEYS.refreshToken),
  };
}

export function listZoomAccountIds(cfg: OpenClawConfig): string[] {
  const zoom = getZoomConfig(cfg);
  const accountIds = Object.keys(zoom.accounts ?? {});
  if (accountIds.length > 0) {
    return accountIds;
  }
  return [DEFAULT_ACCOUNT_ID];
}

export function resolveDefaultZoomAccountId(cfg: OpenClawConfig): string {
  const accountIds = listZoomAccountIds(cfg);
  return accountIds[0] ?? DEFAULT_ACCOUNT_ID;
}

export function resolveZoomAccount(params: {
  cfg: OpenClawConfig;
  accountId?: string | null;
}): ResolvedZoomAccount {
  const zoom = getZoomConfig(params.cfg);
  const normalizedAccountId = normalizeAccountId(params.accountId);
  const accountSection = zoom.accounts?.[normalizedAccountId];

  const merged = withEnvFallback(
    mergeAccountConfig(zoom, accountSection, normalizedAccountId),
    normalizedAccountId,
  );

  const tokenSource = merged.accessToken
    ? zoom.accounts?.[normalizedAccountId]?.accessToken || zoom.accessToken
      ? "config"
      : "env"
    : "none";

  const enabledValue =
    accountSection?.enabled ??
    (normalizedAccountId === DEFAULT_ACCOUNT_ID ? zoom.enabled : undefined) ??
    true;

  return {
    accountId: normalizedAccountId,
    name: merged.name,
    enabled: enabledValue !== false,
    tokenSource,
    config: {
      ...merged,
      webhookPath: merged.webhookPath ?? DEFAULT_WEBHOOK_PATH,
      requestTimeoutMs: merged.requestTimeoutMs ?? DEFAULT_TIMEOUT_MS,
      dmPolicy: merged.dmPolicy ?? "pairing",
      groupPolicy: merged.groupPolicy ?? "allowlist",
    },
  };
}

export function applyZoomAccountName(
  cfg: OpenClawConfig,
  accountId: string,
  name?: string,
): OpenClawConfig {
  if (!name?.trim()) {
    return cfg;
  }

  const zoom = getZoomConfig(cfg);

  if (accountId === DEFAULT_ACCOUNT_ID && !(zoom.accounts && zoom.accounts[accountId])) {
    return {
      ...cfg,
      channels: {
        ...cfg.channels,
        zoom: {
          ...zoom,
          name,
        },
      },
    } as OpenClawConfig;
  }

  return {
    ...cfg,
    channels: {
      ...cfg.channels,
      zoom: {
        ...zoom,
        accounts: {
          ...zoom.accounts,
          [accountId]: {
            ...zoom.accounts?.[accountId],
            name,
          },
        },
      },
    },
  } as OpenClawConfig;
}

export function normalizeZoomAccountId(accountId?: string | null): string {
  return normalizeAccountId(accountId);
}
