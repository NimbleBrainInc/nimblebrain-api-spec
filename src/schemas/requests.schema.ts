import { z } from "./zodSetup";

export const CreateConversationSchema = z
  .object({
    text: z.string(),
  })
  .openapi("CreateConversation");

export type CreateConversationRequest = z.infer<typeof CreateConversationSchema>;

export const CreateMessageSchema = z
  .object({
    text: z.string(),
  })
  .openapi("CreateMessage");

export type CreateMessageRequest = z.infer<typeof CreateMessageSchema>;
