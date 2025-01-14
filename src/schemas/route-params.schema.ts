import { OpenAPIRegistry } from "@asteasolutions/zod-to-openapi";
import { AgentParamsSchema, ConversationParamsSchema } from "../schemas";

export const getRouteParams = (registry: OpenAPIRegistry) => {
  registry.register("AgentParams", AgentParamsSchema);
  registry.register("ConversationParams", ConversationParamsSchema);

  return {
    agent: [
      {
        name: "agentId",
        in: "path" as const,
        required: true,
        description: "UUID of the agent",
        schema: { $ref: "#/components/schemas/AgentParams/properties/agentId" },
      },
    ],
    conversation: [
      {
        name: "conversationId",
        in: "path" as const,
        required: true,
        description: "UUID of the conversation",
        schema: { $ref: "#/components/schemas/ConversationParams/properties/conversationId" },
      },
    ],
  } as const;
};
