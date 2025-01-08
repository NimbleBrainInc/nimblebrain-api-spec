import { OpenAPIRegistry } from "@asteasolutions/zod-to-openapi";
import { createPaginatedResponseSchema } from "../../schemas";
import { AgentSchema } from "../../schemas/agent.schema";
import { authErrorResponses, paginationParams } from "../common";

export const registerAgentRoutes = (registry: OpenAPIRegistry) => {
  registry.registerPath({
    method: "get",
    path: "/agents",
    security: [{ bearerAuth: [] }],
    summary: "List all agents",
    tags: ["Agents"],
    parameters: [...paginationParams],
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
