import { z } from "./zodSetup";

export const CreateConversationSchema = z
  .object({
    text: z.string().min(2, "Text must be at least 2 characters long"),
  })
  .openapi("CreateConversation");

export type CreateConversationRequest = z.infer<typeof CreateConversationSchema>;

export const CreateMessageSchema = z
  .object({
    text: z.string().min(2, "Text must be at least 2 characters long"),
  })
  .openapi("CreateMessage");

export type CreateMessageRequest = z.infer<typeof CreateMessageSchema>;
