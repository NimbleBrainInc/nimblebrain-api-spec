import { z } from "./zodSetup";

export const PaginationQuerySchema = z
  .object({
    page: z.number().default(1),
    limit: z.number().default(10),
  })
  .openapi("Message");

export type PaginationQuery = z.infer<typeof PaginationQuerySchema>;

export const createPaginatedResponseSchema = <T extends z.ZodType>(schema: T, name: string) => {
  return z
    .object({
      data: z.array(schema),
      page: z.number().int().min(1),
      limit: z.number().int().min(1),
      total: z.number().int().min(0),
    })
    .openapi(`Paginated${name}`);
};

// Type helper for paginated responses
export type PaginatedResponse<T> = {
  data: T[];
  page: number;
  limit: number;
  total: number;
};
