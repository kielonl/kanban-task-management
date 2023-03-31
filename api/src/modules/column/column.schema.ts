import { z } from "zod";

const STATUS = ["TODO", "DOING", "DONE"] as const;

const ColumnSchema = z.object({
  name: z.enum(STATUS, {
    invalid_type_error: "Status must be a string",
    required_error: "status must be one of todo, doing, done",
  }),
  board_id: z.string().uuid(),
});

export type ColumnSchema = z.infer<typeof ColumnSchema>;
