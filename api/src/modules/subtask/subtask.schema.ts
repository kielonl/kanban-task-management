import { z } from "zod";

export const SubtaskSchema = z.object({
  title: z.string().min(1).max(100),
  isCompleted: z.boolean().default(false),
  task_id: z.string().uuid(),
});

export type SubtaskSchema = z.infer<typeof SubtaskSchema>;
