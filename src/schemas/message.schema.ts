import { z } from "./zodSetup";

export const MessageSchema = z
  .object({
    id: z.string().uuid(),
    content: z.string(),
    dateCreated: z.date(),
  })
  .openapi("Message");
