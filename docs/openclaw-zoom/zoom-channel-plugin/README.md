# @openclaw/zoom (scaffold)

Scaffold for a community Zoom Team Chat channel plugin for OpenClaw.

## Install (local)

```bash
openclaw plugins install ./extensions/zoom
```

## Config sample

```json
{
  "channels": {
    "zoom": {
      "enabled": true,
      "webhookPath": "/zoom/webhook",
      "accounts": {
        "default": {
          "name": "YBH Zoom",
          "clientId": "${ZOOM_CLIENT_ID}",
          "clientSecret": "${ZOOM_CLIENT_SECRET}",
          "botJid": "${ZOOM_BOT_JID}",
          "verificationToken": "${ZOOM_VERIFICATION_TOKEN}",
          "accountId": "${ZOOM_ACCOUNT_ID}",
          "refreshToken": "${ZOOM_REFRESH_TOKEN}",
          "accessToken": "${ZOOM_ACCESS_TOKEN}",
          "tokenExpiresAt": 0,
          "defaultChannel": "channel-jid@xmpp.zoom.us",
          "enabled": true
        }
      }
    }
  }
}
```

## ngrok local test

1. Start gateway locally (for example on 18789).
2. Run `ngrok http 18789`.
3. Set Zoom webhook endpoint to: `https://<id>.ngrok-free.app/zoom/webhook`.
4. Send a message to your bot in Zoom Team Chat.
5. Verify inbound message appears in OpenClaw and reply is delivered back.

## Notes

- This scaffold prioritizes a clean plugin structure and token refresh flow.
- You may need to tune webhook validation behavior depending on your Zoom app type.
- Keep secrets in environment variables or a secure secret manager.
