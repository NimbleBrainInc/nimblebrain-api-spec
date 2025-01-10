import { z } from "./zodSetup";

export const AgentSchema = z
  .object({
    id: z.string().uuid(),
    title: z.string(),
  })
  .openapi("Agent");

export type Agent = z.infer<typeof AgentSchema>;
