import { z } from "./zodSetup";

export const CreateConversationSchema = z
  .object({
    content: z.string(),
  })
  .openapi("CreateConversation");

export const CreateMessageSchema = z
  .object({
    content: z.string(),
  })
  .openapi("CreateMessage");
