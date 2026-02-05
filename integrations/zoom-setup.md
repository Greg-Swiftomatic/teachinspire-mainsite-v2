# Zoom Channel Setup

## Config Block (merge into openclaw.json)

```json
{
  "channels": {
    "zoom": {
      "enabled": true,
      "accounts": {
        "default": {
          "name": "YBH Zoom",
          "enabled": true,
          "webhookPath": "/zoom/webhook",
          "defaultChannel": "REPLACE_WITH_CHANNEL_JID@xmpp.zoom.us",
          "dmPolicy": "pairing",
          "groupPolicy": "allowlist"
        }
      }
    }
  }
}
```

## Environment Variables

```bash
# .env.zoom (or export in shell before starting OpenClaw)
export ZOOM_CLIENT_ID='PNd5adnT9yYYeB0qBOkdg'
export ZOOM_CLIENT_SECRET='H2X23poIHDVjZ7mjns8gzhgYq2EAgFWM'
export ZOOM_BOT_JID='v1ybslpxaiq8ax0tohcqbxbg@xmpp.zoom.us'
export ZOOM_VERIFICATION_TOKEN='dXTZ59o6RdyzOrb-HzId2Q'
export ZOOM_ACCOUNT_ID='CcTt_BelQIuqNy8bug7IyQ'

# Required for sending/replies (token manager refreshes when expired)
export ZOOM_REFRESH_TOKEN='REPLACE_REFRESH_TOKEN'

# Optional if you already have one
export ZOOM_ACCESS_TOKEN='REPLACE_ACCESS_TOKEN'
```

## Installation Steps

```bash
# 1. Clone OpenClaw (persistent path)
mkdir -p /Users/gregld/Documents/GitHub/openclaw
git clone https://github.com/openclaw/openclaw.git /Users/gregld/Documents/GitHub/openclaw

# 2. Copy scaffold
cp -r docs/openclaw-zoom/zoom-channel-plugin \
  /Users/gregld/Documents/GitHub/openclaw/extensions/zoom

# 3. Install workspace deps at root
cd /Users/gregld/Documents/GitHub/openclaw
pnpm install

# 4. Install plugin locally
openclaw plugins install ./extensions/zoom

# 5. Add channels.zoom config + source env vars
# 6. Start gateway
# 7. Run ngrok: ngrok http 18789
# 8. Set webhook in Zoom Marketplace: https://<id>.ngrok-free.app/zoom/webhook
# 9. Test: send message in Zoom Team Chat
```

## Notes

- Keep Telegram active; Zoom runs alongside it
- Don't commit env vars
- ZOOM_REFRESH_TOKEN is required for replies once access token expires
- Get refresh token via OAuth flow in Zoom Marketplace app
