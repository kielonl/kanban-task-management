import { z } from "zod";

const ColumnSchema = z.object({
  name: z
    .string({
      invalid_type_error: "name must be a string",
      required_error: "name is required",
    })
    .min(1)
    .max(100),
});

export type ColumnSchema = z.infer<typeof ColumnSchema>;
