import { OpenAPIRegistry } from "@asteasolutions/zod-to-openapi";
import { z } from "zod";
import { ErrorCode, ErrorDetailSchema } from "../schemas/responses.schema";

export const registerCommonSchemas = (registry: OpenAPIRegistry) => {
  registry.register("ErrorDetail", ErrorDetailSchema);
  registry.register("ErrorCode", z.nativeEnum(ErrorCode));

  const standardErrors = {
    400: {
      description: "Bad Request - Invalid input",
      content: {
        "application/json": {
          schema: z.object({
            data: z.null(),
            error: ErrorDetailSchema.extend({
              status: z.literal(400),
              code: z.enum([
                ErrorCode.BAD_REQUEST,
                ErrorCode.VALIDATION_ERROR,
                ErrorCode.INVALID_INPUT,
                ErrorCode.MISSING_REQUIRED_FIELD,
                ErrorCode.INVALID_FORMAT,
              ] as const),
            }),
          }),
        },
      },
    },
    401: {
      description: "Unauthorized - Authentication required",
      content: {
        "application/json": {
          schema: z.object({
            data: z.null(),
            error: ErrorDetailSchema.extend({
              status: z.literal(401),
              code: z.enum([
                ErrorCode.UNAUTHORIZED,
                ErrorCode.INVALID_CREDENTIALS,
                ErrorCode.TOKEN_EXPIRED,
              ] as const),
            }),
          }),
        },
      },
    },
    403: {
      description: "Forbidden - Insufficient permissions",
      content: {
        "application/json": {
          schema: z.object({
            data: z.null(),
            error: ErrorDetailSchema.extend({
              status: z.literal(403),
              code: z.enum([ErrorCode.FORBIDDEN, ErrorCode.INSUFFICIENT_PERMISSIONS] as const),
            }),
          }),
        },
      },
    },
    404: {
      description: "Not Found - Resource not found",
      content: {
        "application/json": {
          schema: z.object({
            data: z.null(),
            error: ErrorDetailSchema.extend({
              status: z.literal(404),
              code: z.literal(ErrorCode.NOT_FOUND),
            }),
          }),
        },
      },
    },
    429: {
      description: "Too Many Requests - Rate limit exceeded",
      content: {
        "application/json": {
          schema: z.object({
            data: z.null(),
            error: ErrorDetailSchema.extend({
              status: z.literal(429),
              code: z.enum([ErrorCode.RATE_LIMIT_EXCEEDED, ErrorCode.QUOTA_EXCEEDED] as const),
            }),
          }),
        },
      },
    },
    500: {
      description: "Internal Server Error",
      content: {
        "application/json": {
          schema: z.object({
            data: z.null(),
            error: ErrorDetailSchema.extend({
              status: z.literal(500),
              code: z.enum([
                ErrorCode.INTERNAL_ERROR,
                ErrorCode.DATABASE_ERROR,
                ErrorCode.DATA_CORRUPTION,
                ErrorCode.INCONSISTENT_STATE,
                ErrorCode.UNEXPECTED_ERROR,
              ] as const),
            }),
          }),
        },
      },
    },
    503: {
      description: "Service Unavailable",
      content: {
        "application/json": {
          schema: z.object({
            data: z.null(),
            error: ErrorDetailSchema.extend({
              status: z.literal(503),
              code: z.enum([
                ErrorCode.SERVICE_UNAVAILABLE,
                ErrorCode.EXTERNAL_SERVICE_ERROR,
              ] as const),
            }),
          }),
        },
      },
    },
  };

  return standardErrors;
};
