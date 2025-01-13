import { OpenAPIRegistry } from "@asteasolutions/zod-to-openapi";
import { ErrorCodeEnum, ErrorDetailSchema } from "../schemas/responses.schema";

export const registerCommonSchemas = (registry: OpenAPIRegistry) => {
  registry.register("ErrorDetail", ErrorDetailSchema);
  registry.register("ErrorCode", ErrorCodeEnum);

  return {
    400: {
      description: "Bad Request - Invalid input",
      content: {
        "application/json": {
          schema: ErrorDetailSchema,
        },
      },
    },
    401: {
      description: "Unauthorized - Authentication required",
      content: {
        "application/json": {
          schema: ErrorDetailSchema,
        },
      },
    },
    403: {
      description: "Forbidden - Insufficient permissions",
      content: {
        "application/json": {
          schema: ErrorDetailSchema,
        },
      },
    },
    404: {
      description: "Not Found - Resource not found",
      content: {
        "application/json": {
          schema: ErrorDetailSchema,
        },
      },
    },
    429: {
      description: "Too Many Requests - Rate limit exceeded",
      content: {
        "application/json": {
          schema: ErrorDetailSchema,
        },
      },
    },
    500: {
      description: "Internal Server Error",
      content: {
        "application/json": {
          schema: ErrorDetailSchema,
        },
      },
    },
  };
};
