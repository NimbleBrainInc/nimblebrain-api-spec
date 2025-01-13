import { PaginationQuerySchema } from "./pagination.schema";
import { z } from "./zodSetup";

// Base error schema
export const ErrorDetailSchema = z.object({
  id: z.string().uuid(),
  errorCode: z.string(),
  message: z.string(),
  details: z.record(z.unknown()).optional(),
  timestamp: z.string().datetime(),
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

export type ErrorCode = z.infer<typeof ErrorCodeEnum>;
export type ErrorDetail = z.infer<typeof ErrorDetailSchema>;
export type APIResponse<T> = z.infer<ReturnType<typeof createAPIResponseSchema<z.ZodType<T>>>>;
export type PaginatedResponse<T> = APIResponse<{
  items: T[];
  page: number;
  limit: number;
  total: number;
}>;
