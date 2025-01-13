import { OpenAPIRegistry } from "@asteasolutions/zod-to-openapi";
import { z } from "./zodSetup";

export const PaginationQuerySchema = z
  .object({
    page: z
      .string()
      .default("1")
      .transform((val) => Number(val)),
    limit: z
      .string()
      .default("10")
      .transform((val) => Number(val)),
  })
  .openapi("PaginationQuery");

export type PaginationQuery = z.infer<typeof PaginationQuerySchema>;

// Helper function to get pagination parameters
export const getPaginationParams = (registry: OpenAPIRegistry) => {
  registry.register("PaginationQuery", PaginationQuerySchema);

  return [
    {
      name: "page",
      in: "query" as const,
      required: false,
      schema: { $ref: "#/components/schemas/PaginationQuery/properties/page" },
    },
    {
      name: "limit",
      in: "query" as const,
      required: false,
      schema: { $ref: "#/components/schemas/PaginationQuery/properties/limit" },
    },
  ] as const;
};

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
