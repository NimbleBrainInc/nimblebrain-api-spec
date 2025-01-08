import { OpenAPIRegistry } from "@asteasolutions/zod-to-openapi";
import { registerAgentRoutes } from "./agents";
import { registerConversationRoutes } from "./conversations";
import { registerMessageRoutes } from "./messages";

export const registerRoutes = (registry: OpenAPIRegistry) => {
  registerAgentRoutes(registry);
  registerConversationRoutes(registry);
  registerMessageRoutes(registry);
};
