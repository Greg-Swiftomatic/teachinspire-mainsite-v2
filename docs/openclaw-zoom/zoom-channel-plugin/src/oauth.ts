import type { ResolvedZoomAccount } from "./types.js";

type OAuthTokenResponse = {
  access_token?: string;
  refresh_token?: string;
  expires_in?: number;
};

type TokenState = {
  accessToken?: string;
  refreshToken?: string;
  tokenExpiresAt?: number;
};

const CLOCK_SKEW_MS = 60_000;

export class ZoomTokenManager {
  private state: TokenState;

  constructor(
    private readonly account: ResolvedZoomAccount,
    private readonly fetcher: typeof fetch = fetch,
  ) {
    this.state = {
      accessToken: account.config.accessToken,
      refreshToken: account.config.refreshToken,
      tokenExpiresAt: account.config.tokenExpiresAt,
    };
  }

  getAccount(): ResolvedZoomAccount {
    return this.account;
  }

  getCachedState(): TokenState {
    return { ...this.state };
  }

  async getAccessToken(): Promise<string> {
    const now = Date.now();

    if (this.state.accessToken && (this.state.tokenExpiresAt ?? Number.MAX_SAFE_INTEGER) > now + CLOCK_SKEW_MS) {
      return this.state.accessToken;
    }

    await this.refreshAccessToken();

    if (!this.state.accessToken) {
      throw new Error("Zoom access token unavailable after refresh");
    }

    return this.state.accessToken;
  }

  async refreshAccessToken(): Promise<void> {
    const clientId = this.account.config.clientId?.trim();
    const clientSecret = this.account.config.clientSecret?.trim();
    const refreshToken = this.state.refreshToken?.trim() ?? this.account.config.refreshToken?.trim();

    if (!clientId || !clientSecret) {
      throw new Error("Zoom clientId/clientSecret are required for token refresh");
    }

    if (!refreshToken) {
      throw new Error("Zoom refresh token is missing");
    }

    const basic = Buffer.from(`${clientId}:${clientSecret}`).toString("base64");
    const body = new URLSearchParams({
      grant_type: "refresh_token",
      refresh_token: refreshToken,
    });

    const response = await this.fetcher("https://zoom.us/oauth/token", {
      method: "POST",
      headers: {
        Authorization: `Basic ${basic}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: body.toString(),
    });

    if (!response.ok) {
      const detail = await response.text().catch(() => "");
      throw new Error(`Zoom token refresh failed (${response.status}): ${detail || response.statusText}`);
    }

    const data = (await response.json()) as OAuthTokenResponse;

    if (!data.access_token) {
      throw new Error("Zoom token refresh response missing access_token");
    }

    this.state.accessToken = data.access_token;
    this.state.refreshToken = data.refresh_token ?? refreshToken;
    this.state.tokenExpiresAt = Date.now() + Math.max(1, data.expires_in ?? 3600) * 1000;
  }
}
