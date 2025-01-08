import { OpenAPIRegistry } from "@asteasolutions/zod-to-openapi";
import { CreateMessageSchema, MessageSchema, createPaginatedResponseSchema } from "../../schemas";
import { authErrorResponses, paginationParams, routeParams } from "../common";

export const registerMessageRoutes = (registry: OpenAPIRegistry) => {
  // GET /agents/:agentUuid/conversations/:conversationUuid/messages
  registry.registerPath({
    method: "get",
    path: "/agents/{agentUuid}/conversations/{conversationUuid}/messages",
    security: [{ bearerAuth: [] }],
    summary: "List conversation messages",
    tags: ["Messages"],
    parameters: [...routeParams.agent, ...routeParams.conversation, ...paginationParams],
    responses: {
      200: {
        description: "Messages retrieved successfully",
        content: {
          "application/json": {
            schema: createPaginatedResponseSchema(MessageSchema, "Messages"),
          },
        },
      },
      ...authErrorResponses,
    },
  });

  // POST /agents/:agentUuid/conversations/:conversationUuid/messages
  registry.registerPath({
    method: "post",
    path: "/agents/{agentUuid}/conversations/{conversationUuid}/messages",
    security: [{ bearerAuth: [] }],
    summary: "Add a message to conversation",
    tags: ["Messages"],
    parameters: [...routeParams.agent, ...routeParams.conversation],
    request: {
      body: {
        content: {
          "application/json": {
            schema: CreateMessageSchema,
          },
        },
      },
    },
    responses: {
      201: {
        description: "Message added successfully",
        content: {
          "application/json": {
            schema: MessageSchema,
          },
        },
      },
      ...authErrorResponses,
    },
  });
};
