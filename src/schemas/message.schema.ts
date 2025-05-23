import { z } from "./zodSetup";

export const MessageSchema = z
  .object({
    id: z.string().uuid(),
    isSystem: z.boolean(),
    text: z.string(),
    dateCreated: z.date(),
  })
  .openapi("Message");

export type Message = z.infer<typeof MessageSchema>;
