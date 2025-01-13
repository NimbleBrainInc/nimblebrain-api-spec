import { OpenAPIRegistry } from "@asteasolutions/zod-to-openapi";
import { AgentSchema, createPaginatedResponseSchema, getPaginationParams } from "../../schemas";
import { authErrorResponses } from "../common";

export const registerAgentRoutes = (registry: OpenAPIRegistry) => {
  registry.registerPath({
    method: "get",
    path: "/agents",
    security: [{ bearerAuth: [] }],
    summary: "List all agents",
    tags: ["Agents"],
    parameters: [...getPaginationParams(registry)],
    responses: {
      200: {
        description: "List of agents retrieved successfully",
        content: {
          "application/json": {
            schema: createPaginatedResponseSchema(AgentSchema, "Agents"),
          },
        },
      },
      ...authErrorResponses,
    },
  });
};
