import { OpenAPIRegistry } from "@asteasolutions/zod-to-openapi";
import { z } from "./zodSetup";

export const PaginationQuerySchema = z
  .object({
    page: z
      .string()
      .optional()
      .refine((val) => !val || !isNaN(Number(val)), "Page must be a valid number")
      .transform((val) => Number(val ?? 1)),
    limit: z
      .string()
      .optional()
      .refine((val) => !val || !isNaN(Number(val)), "Limit must be a valid number")
      .transform((val) => Number(val ?? 10)),
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

export type PaginatedData<T> = {
  items: T[];
  page: number;
  limit: number;
  total: number;
};
