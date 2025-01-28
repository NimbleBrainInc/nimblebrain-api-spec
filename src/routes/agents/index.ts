import { OpenAPIRegistry } from "@asteasolutions/zod-to-openapi";
import {
  AgentSchema,
  createPaginatedResponseSchema,
  getPaginationParams,
  getRouteParams,
} from "../../schemas";
import { registerCommonSchemas } from "../common";

export const registerAgentRoutes = (registry: OpenAPIRegistry) => {
  const routeParams = getRouteParams(registry);
  const standardErrors = registerCommonSchemas(registry);

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
      ...standardErrors,
    },
  });

  registry.registerPath({
    method: "get",
    path: "/agents/{agentId}",
    security: [{ bearerAuth: [] }],
    summary: "Gets an Agent",
    tags: ["Agents"],
    parameters: [...routeParams.agent],
    responses: {
      200: {
        description: "Agent details",
        content: {
          "application/json": {
            schema: AgentSchema,
          },
        },
      },
      ...standardErrors,
    },
  });
};
