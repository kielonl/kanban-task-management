import { z } from "zod";

export const SubtaskSchema = z.object({
  id: z.string().uuid(),
  title: z.string().min(1).max(100),
  isCompleted: z.boolean().default(false),
  task_id: z.string().uuid(),
});

export type SubtaskSchema = z.infer<typeof SubtaskSchema>;
