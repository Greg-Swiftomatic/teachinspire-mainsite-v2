# Zoom Marketplace App Credentials

**App Type:** General App (605)
**Status:** Local Test (not ready - needs OAuth URLs)

## Credentials

| Field | Value |
|-------|-------|
| Client ID | `PNd5adnT9yYYeB0qBOkdg` |
| Client Secret | `H2X23poIHDVjZ7mjns8gzhgYq2EAgFWM` |
| Bot JID | `v1ybslpxaiq8ax0tohcqbxbg@xmpp.zoom.us` |
| Verification Token | `dXTZ59o6RdyzOrb-HzId2Q` |
| Account ID | `CcTt_BelQIuqNy8bug7IyQ` |

## Config Block (for when plugin exists)

```yaml
channels:
  zoom:
    enabled: true
    clientId: "PNd5adnT9yYYeB0qBOkdg"
    clientSecret: "H2X23poIHDVjZ7mjns8gzhgYq2EAgFWM"
    botJid: "v1ybslpxaiq8ax0tohcqbxbg@xmpp.zoom.us"
    verificationToken: "dXTZ59o6RdyzOrb-HzId2Q"
    accountId: "CcTt_BelQIuqNy8bug7IyQ"
    defaultChannel: "REPLACE_WITH_CHANNEL_JID"
```

## Setup Checklist (pending plugin)

1. [ ] Run gateway locally on 18789
2. [ ] Run: `ngrok http 18789`
3. [ ] Set webhook endpoint: `https://<ngrok-id>.ngrok-free.app/zoom/webhook`
4. [ ] In Zoom app Basic Information:
   - OAuth Redirect URL: `https://<ngrok-id>.ngrok-free.app/zoom/oauth/callback`
   - OAuth Allow List: `https://<ngrok-id>.ngrok-free.app`
5. [ ] Save, go to Local Test, install app
6. [ ] Send bot a Zoom Team Chat message; verify OpenClaw receives + replies

## Notes

- Created: 2026-02-05
- OpenClaw doesn't have a Zoom channel plugin yet (as of this date)
- Check GitHub discussions or Discord for updates
