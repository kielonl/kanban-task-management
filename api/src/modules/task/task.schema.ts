import { z } from "zod";

const STATUS = ["TODO", "DOING", "DONE"] as const;

const TaskSchema = z.object({
  title: z
    .string({
      invalid_type_error: "Title must be a string",
      required_error: "Title is required",
    })
    .min(1)
    .max(100),
  description: z
    .string({
      invalid_type_error: "Description must be a string",
      required_error: "Description is required",
    })
    .min(1)
    .max(100),
  status: z.enum(STATUS, {
    invalid_type_error: "Status must be a string",
    required_error: "status must be one of todo, doing, done",
  }),
  board_id: z.string().uuid(),
  subtasks: z.array(
    z.object({
      title: z.string().min(1).max(100),
      isCompleted: z.boolean(),
      task_id: z.string().uuid(),
    })
  ),
});

export type TaskSchema = z.infer<typeof TaskSchema>;
