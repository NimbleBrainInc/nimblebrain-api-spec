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
