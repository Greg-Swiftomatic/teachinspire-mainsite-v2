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
# ⚠️ ROTATES on each refresh — always keep the newest one!
export ZOOM_REFRESH_TOKEN='eyJzdiI6IjAwMDAwMiIsImFsZyI6IkhTNTEyIiwidiI6IjIuMCIsImtpZCI6IjA1ODNhNDYyLWUxM2YtNDBiMC1hMDgxLTE1NGI5NmNiNmQzMyJ9.eyJhdWQiOiJodHRwczovL29hdXRoLnpvb20udXMiLCJ1aWQiOiJVYTFic1NkOFF3ZWhqTVJMclhacE1nIiwidmVyIjoxMCwiYXVpZCI6IjQ3NjdmZTE3ZTQ3ZmNjM2MxMjAwMjc2NWM4Zjg1MDZjZGQxM2IzODljZmQ5NDJhOTlkMWUzNzIzOWNlNGY3M2UiLCJuYmYiOjE3NzAyNzkxMTgsImNvZGUiOiJhZmhSbjF0MEFxNG1HQkZGbmd2VFEtc1B5cG8wc1FqVWciLCJpc3MiOiJ6bTpjaWQ6UE5kNWFkblQ5eVlZZUIwcUJPa2RnIiwiZ25vIjowLCJleHAiOjE3NzgwNTUxMTgsInR5cGUiOjEsImlhdCI6MTc3MDI3OTExOCwiYWlkIjoiQ2NUdF9CZWxRSXVxTnk4YnVnN0l5USJ9.9Ip22bvda3kZ32Uwv5FL0BYRQHjV4nE8VLMNE5YFUl2hXZ_kcLxESLP6642feZjiAsFZoBJa3RJHEkKuR6LclA'

# Current access token (expires in ~1h, auto-refreshed by plugin)
export ZOOM_ACCESS_TOKEN='eyJzdiI6IjAwMDAwMiIsImFsZyI6IkhTNTEyIiwidiI6IjIuMCIsImtpZCI6IjZlMDc5YTMyLTVlNDgtNDFjMi1hMDJhLTIwM2NiNzZkZmQyNCJ9.eyJhdWQiOiJodHRwczovL29hdXRoLnpvb20udXMiLCJ1aWQiOiJVYTFic1NkOFF3ZWhqTVJMclhacE1nIiwidmVyIjoxMCwiYXVpZCI6IjQ3NjdmZTE3ZTQ3ZmNjM2MxMjAwMjc2NWM4Zjg1MDZjZGQxM2IzODljZmQ5NDJhOTlkMWUzNzIzOWNlNGY3M2UiLCJuYmYiOjE3NzAyNzkxMTgsImNvZGUiOiJhZmhSbjF0MEFxNG1HQkZGbmd2VFEtc1B5cG8wc1FqVWciLCJpc3MiOiJ6bTpjaWQ6UE5kNWFkblQ5eVlZZUIwcUJPa2RnIiwiZ25vIjowLCJleHAiOjE3NzAyODI3MTgsInR5cGUiOjAsImlhdCI6MTc3MDI3OTExOCwiYWlkIjoiQ2NUdF9CZWxRSXVxTnk4YnVnN0l5USJ9.3jikUDNEK0bFnHdjZsMgl70Q1oiNgH9KNURFDCbcmwbdGn9WSaqwoaPdzQWESI4i2bmJxXQxi4pUEzi72jVmAw'
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
