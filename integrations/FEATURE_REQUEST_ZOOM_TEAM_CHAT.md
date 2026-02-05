# Feature Request: Native Zoom Team Chat Channel for OpenClaw

## Summary
Please add first-party support for Zoom Team Chat as a channel in OpenClaw, similar to Telegram/Slack/Discord/Google Chat.

## Why this matters
- Teams already running on Zoom want one assistant across their existing channels.
- Zoom Team Chat bots support webhook inbound events + REST outbound messages, which matches OpenClaw's channel model.
- Current workaround is a custom bridge/plugin, but native support would improve onboarding, maintainability, and documentation.

## Proposed scope (MVP)

### Inbound
- Webhook endpoint for bot_notification events
- URL validation handshake support
- Verification token/signature validation
- Extract and route: accountId, userId, channelId`/`jid, message.text, timestamp

### Outbound
- Send text replies via Zoom Team Chat API (`POST /v2/im/chat/messages`)
- Support direct + channel targets
- Basic markdown/plain text
- Optional @mentions

### Auth/token lifecycle
- OAuth 2 with refresh token handling
- Auto refresh on expiry (1h access token)
- Configurable client ID/secret + bot/account identifiers

### OpenClaw integration
- Channel config under channels.zoom
- Channel probe to validate credentials
- Works with pairing, routing, session context, and reply dispatch
- Docs page + onboarding wizard prompt parity with existing channels

## Suggested config shape

```json
{
  "channels": {
    "zoom": {
      "enabled": true,
      "clientId": "...",
      "clientSecret": "...",
      "botJid": "...@xmpp.zoom.us",
      "verificationToken": "...",
      "accountId": "...",
      "defaultChannel": "...",
      "refreshToken": "...",
      "webhookPath": "/zoom/webhook"
    }
  }
}
```

## Acceptance criteria
- Incoming Zoom messages create OpenClaw sessions and receive replies.
- Outbound send works to both DM and channel targets.
- Token refresh works automatically without manual restart.
- `openclaw channels status --channel zoom` reports config/probe state.
- Docs include setup, scopes, ngrok/local test flow, and security notes.

## References
- Zoom Team Chat API: https://developers.zoom.us/docs/api/rest/reference/team-chat/methods/
- Send chatbot message: https://developers.zoom.us/docs/team-chat-apps/send-a-chatbot-message/
- Webhooks: https://developers.zoom.us/docs/api/rest/webhook-reference/
- OAuth: https://developers.zoom.us/docs/integrations/oauth/
