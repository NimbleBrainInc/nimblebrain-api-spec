import { z } from "./zodSetup";

export const AgentSchema = z
  .object({
    id: z.string().uuid(),
    title: z.string(),
    avatarUrl: z.string().url().optional(),
  })
  .openapi("Agent");

export const AgentParamsSchema = z
  .object({
    agentId: z.string().uuid(),
  })
  .openapi("AgentParams");

export type Agent = z.infer<typeof AgentSchema>;
export type AgentParams = z.infer<typeof AgentParamsSchema>;
