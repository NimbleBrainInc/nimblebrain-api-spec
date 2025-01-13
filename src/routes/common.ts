import { z } from "../schemas/zodSetup";

export const authErrorResponses = {
  401: {
    description: "Unauthorized - No token provided or agent not found",
    content: {
      "application/json": {
        schema: z.object({
          error: z.string(),
        }),
      },
    },
  },
  403: {
    description: "Forbidden - Invalid token or token does not match agent",
    content: {
      "application/json": {
        schema: z.object({
          error: z.string(),
        }),
      },
    },
  },
};

export const routeParams = {
  agent: [
    {
      name: "agentUuid",
      in: "path" as const,
      required: true,
      description: "UUID of the agent",
      schema: {
        type: "string" as const,
        format: "uuid" as const,
      },
    },
  ],
  conversation: [
    {
      name: "conversationUuid",
      in: "path" as const,
      required: true,
      description: "UUID of the conversation",
      schema: {
        type: "string" as const,
        format: "uuid" as const,
      },
    },
  ],
} as const;
