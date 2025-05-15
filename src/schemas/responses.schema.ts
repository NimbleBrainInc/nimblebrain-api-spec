import { PaginationQuerySchema } from "./pagination.schema";
import { z } from "./zodSetup";

// HTTP status codes as numbers
export const HttpStatusCodeEnum = z
  .enum([
    "400", // Bad Request
    "401", // Unauthorized
    "402", // Payment Required
    "403", // Forbidden
    "404", // Not Found
    "409", // Conflict
    "422", // Unprocessable Entity
    "429", // Too Many Requests
    "500", // Internal Server Error
    "503", // Service Unavailable
  ])
  .transform(Number);

// Base error schema with numeric HTTP status
export const ErrorDetailSchema = z.object({
  id: z.string().uuid(),
  status: z.number().int().min(400).max(599), // Valid HTTP status codes
  code: z.string(), // Error code like "NOT_FOUND", "VALIDATION_ERROR", etc.
  message: z.string(),
  details: z.record(z.unknown()).optional(),
  timestamp: z.string().datetime(),
});

// Application error codes
export const ErrorCode = {
  // Authentication/Authorization errors (400s)
  UNAUTHORIZED: "UNAUTHORIZED", // Not authenticated
  INVALID_CREDENTIALS: "INVALID_CREDENTIALS",
  TOKEN_EXPIRED: "TOKEN_EXPIRED",
  FORBIDDEN: "FORBIDDEN", // Not authorized
  INSUFFICIENT_PERMISSIONS: "INSUFFICIENT_PERMISSIONS",

  // Resource errors (400s)
  NOT_FOUND: "NOT_FOUND",
  ALREADY_EXISTS: "ALREADY_EXISTS",
  CONFLICT: "CONFLICT",

  // Input validation errors (400s)
  VALIDATION_ERROR: "VALIDATION_ERROR",
  INVALID_INPUT: "INVALID_INPUT",
  MISSING_REQUIRED_FIELD: "MISSING_REQUIRED_FIELD",
  INVALID_FORMAT: "INVALID_FORMAT",

  // Rate limiting/quotas (400s)
  RATE_LIMIT_EXCEEDED: "RATE_LIMIT_EXCEEDED",
  QUOTA_EXCEEDED: "QUOTA_EXCEEDED",
  PAYMENT_REQUIRED: "PAYMENT_REQUIRED",

  // Server errors (500s)
  INTERNAL_ERROR: "INTERNAL_ERROR",
  SERVICE_UNAVAILABLE: "SERVICE_UNAVAILABLE",
  DATABASE_ERROR: "DATABASE_ERROR",
  EXTERNAL_SERVICE_ERROR: "EXTERNAL_SERVICE_ERROR",

  // Data errors (500s)
  DATA_CORRUPTION: "DATA_CORRUPTION",
  INCONSISTENT_STATE: "INCONSISTENT_STATE",

  // Generic errors
  BAD_REQUEST: "BAD_REQUEST",
  UNEXPECTED_ERROR: "UNEXPECTED_ERROR",
} as const;

// Type for the error codes
export type ErrorCodeType = (typeof ErrorCode)[keyof typeof ErrorCode];

// Common mapping of error codes to HTTP status codes
export const errorCodeToStatus: Record<ErrorCodeType, number> = {
  // 400s
  BAD_REQUEST: 400,
  VALIDATION_ERROR: 400,
  INVALID_INPUT: 400,
  MISSING_REQUIRED_FIELD: 400,
  INVALID_FORMAT: 400,

  // 401s
  UNAUTHORIZED: 401,
  INVALID_CREDENTIALS: 401,
  TOKEN_EXPIRED: 401,

  // 402s
  PAYMENT_REQUIRED: 402,

  // 403s
  FORBIDDEN: 403,
  INSUFFICIENT_PERMISSIONS: 403,

  // 404s
  NOT_FOUND: 404,

  // 409s
  ALREADY_EXISTS: 409,
  CONFLICT: 409,

  // 429s
  RATE_LIMIT_EXCEEDED: 429,
  QUOTA_EXCEEDED: 429,

  // 500s
  INTERNAL_ERROR: 500,
  DATABASE_ERROR: 500,
  DATA_CORRUPTION: 500,
  INCONSISTENT_STATE: 500,
  UNEXPECTED_ERROR: 500,

  // 503s
  SERVICE_UNAVAILABLE: 503,
  EXTERNAL_SERVICE_ERROR: 503,
};

export const createPaginatedResponseSchema = <T extends z.ZodType>(schema: T, name: string) => {
  const paginatedSchema = z
    .object({
      items: z.array(schema),
      page: PaginationQuerySchema.shape.page,
      limit: PaginationQuerySchema.shape.limit,
      total: z.number().int().min(0),
    })
    .openapi(`Paginated${name}`);

  return createAPIResponseSchema(paginatedSchema);
};

export const createAPIResponseSchema = <T extends z.ZodType>(dataSchema: T) =>
  z.object({
    data: dataSchema.nullable(),
    error: ErrorDetailSchema.nullable(),
  });

export type ErrorDetail = z.infer<typeof ErrorDetailSchema>;
export type APIResponse<T> = z.infer<ReturnType<typeof createAPIResponseSchema<z.ZodType<T>>>>;
export type PaginatedResponse<T> = APIResponse<{
  items: T[];
  page: number;
  limit: number;
  total: number;
}>;
