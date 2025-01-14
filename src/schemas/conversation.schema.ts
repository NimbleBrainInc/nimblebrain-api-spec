import { MessageSchema } from "./message.schema";
import { z } from "./zodSetup";

export const ConversationSchema = z
  .object({
    id: z.string().uuid(),
    title: z.string(),
    dateCreated: z.date(),
    dateUpdated: z.date(),
    messages: z.array(MessageSchema).optional(),
  })
  .openapi("Conversation");

export const ConversationParamsSchema = z
  .object({
    conversationId: z.string().uuid(),
  })
  .openapi("ConversationParams");

export type Conversation = z.infer<typeof ConversationSchema>;
export type ConversationParams = z.infer<typeof ConversationParamsSchema>;
