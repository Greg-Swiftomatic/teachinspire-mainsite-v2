import { ToolPolicySchema } from "openclaw/plugin-sdk";
import { z } from "zod";

const allowFromEntry = z.union([z.string(), z.number()]);

const ZoomAccountSchema = z
  .object({
    name: z.string().optional(),
    enabled: z.boolean().optional(),
    clientId: z.string().optional(),
    clientSecret: z.string().optional(),
    botJid: z.string().optional(),
    verificationToken: z.string().optional(),
    accountId: z.string().optional(),
    defaultChannel: z.string().optional(),
    accessToken: z.string().optional(),
    refreshToken: z.string().optional(),
    tokenExpiresAt: z.number().optional(),
    webhookPath: z.string().optional(),
    requestTimeoutMs: z.number().optional(),
    dmPolicy: z.enum(["pairing", "allowlist", "open", "disabled"]).optional(),
    groupPolicy: z.enum(["open", "allowlist", "disabled"]).optional(),
    allowFrom: z.array(allowFromEntry).optional(),
    groupAllowFrom: z.array(allowFromEntry).optional(),
    historyLimit: z.number().optional(),
    dmHistoryLimit: z.number().optional(),
    textChunkLimit: z.number().optional(),
    blockStreaming: z.boolean().optional(),
    tools: ToolPolicySchema,
  })
  .strict();

export const ZoomConfigSchema = ZoomAccountSchema.extend({
  accounts: z.object({}).catchall(ZoomAccountSchema).optional(),
});
