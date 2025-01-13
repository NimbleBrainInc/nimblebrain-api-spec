import { OpenAPIRegistry } from "@asteasolutions/zod-to-openapi";
import {
  ConversationSchema,
  CreateConversationSchema,
  CreateMessageSchema,
  createPaginatedResponseSchema,
  getPaginationParams,
  getRouteParams,
  MessageSchema,
} from "../../schemas";
import { registerCommonSchemas } from "../common";

export const registerConversationRoutes = (registry: OpenAPIRegistry) => {
  const routeParams = getRouteParams(registry);
  const standardErrors = registerCommonSchemas(registry);

  // GET /agents/:agentUuid/conversations
  registry.registerPath({
    method: "get",
    path: "/agents/{agentUuid}/conversations",
    security: [{ bearerAuth: [] }],
    summary: "List agent conversations",
    tags: ["Conversations"],
    parameters: [...routeParams.agent, ...getPaginationParams(registry)],
    responses: {
      200: {
        description: "List of conversations retrieved successfully",
        content: {
          "application/json": {
            schema: createPaginatedResponseSchema(ConversationSchema, "Conversations"),
          },
        },
      },
      ...standardErrors,
    },
  });

  // POST /agents/:agentUuid/conversations
  registry.registerPath({
    method: "post",
    path: "/agents/{agentUuid}/conversations",
    security: [{ bearerAuth: [] }],
    summary: "Create a new conversation",
    tags: ["Conversations"],
    parameters: [...routeParams.agent],
    request: {
      body: {
        content: {
          "application/json": {
            schema: CreateConversationSchema,
          },
        },
      },
    },
    responses: {
      201: {
        description: "Conversation created successfully",
        content: {
          "application/json": {
            schema: ConversationSchema,
          },
        },
      },
      ...standardErrors,
    },
  });

  // GET /agents/:agentUuid/conversations/:conversationUuid
  registry.registerPath({
    method: "get",
    path: "/agents/{agentUuid}/conversations/{conversationUuid}",
    security: [{ bearerAuth: [] }],
    summary: "Retrieves a conversation",
    tags: ["Conversations"],
    parameters: [
      ...routeParams.agent,
      ...routeParams.conversation,
      ...getPaginationParams(registry),
    ],
    responses: {
      200: {
        description: "Conversation retrieved successfully",
        content: {
          "application/json": {
            schema: ConversationSchema,
          },
        },
      },
      ...standardErrors,
    },
  });

  // GET /agents/:agentUuid/conversations/:conversationUuid/messages
  registry.registerPath({
    method: "get",
    path: "/agents/{agentUuid}/conversations/{conversationUuid}/messages",
    security: [{ bearerAuth: [] }],
    summary: "List conversation messages",
    tags: ["Messages"],
    parameters: [
      ...routeParams.agent,
      ...routeParams.conversation,
      ...getPaginationParams(registry),
    ],
    responses: {
      200: {
        description: "Messages retrieved successfully",
        content: {
          "application/json": {
            schema: createPaginatedResponseSchema(MessageSchema, "Messages"),
          },
        },
      },
      ...standardErrors,
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
      ...standardErrors,
    },
  });

  // DELETE /agents/:agentUuid/conversations/:conversationUuid
  registry.registerPath({
    method: "delete",
    path: "/agents/{agentUuid}/conversations/{conversationUuid}",
    security: [{ bearerAuth: [] }],
    summary: "Delete a conversation",
    tags: ["Conversations"],
    parameters: [...routeParams.agent, ...routeParams.conversation],
    responses: {
      204: {
        description: "Conversation deleted successfully",
      },
      ...standardErrors,
    },
  });
};
