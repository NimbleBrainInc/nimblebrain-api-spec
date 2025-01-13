import { z } from "./zodSetup";

// Base error schema
export const ErrorDetailSchema = z.object({
  id: z.string().uuid(),
  errorCode: z.string(),
  message: z.string(),
  details: z.record(z.unknown()).optional(),
  timestamp: z.string().datetime(),
});

// Create a generic API response schema that can be used with any data type
export const createAPIResponseSchema = <T extends z.ZodType>(dataSchema: T) =>
  z.object({
    data: dataSchema.nullable(),
    error: ErrorDetailSchema.nullable(),
  });

// Error code enum as a Zod enum
export const ErrorCodeEnum = z.enum([
  "UNAUTHORIZED",
  "FORBIDDEN",
  "NOT_FOUND",
  "VALIDATION_ERROR",
  "RATE_LIMIT_EXCEEDED",
  "GENERIC_ERROR",
  "GENERIC_CLIENT_ERROR",
  "GENERIC_SERVER_ERROR",
]);

export type ErrorCode = z.infer<typeof ErrorCodeEnum>;
export type ErrorDetail = z.infer<typeof ErrorDetailSchema>;
export type APIResponse<T> = z.infer<ReturnType<typeof createAPIResponseSchema<z.ZodType<T>>>>;
