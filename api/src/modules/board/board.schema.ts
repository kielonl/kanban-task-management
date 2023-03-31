import { z } from "zod";

const STATUS = ["TODO", "DOING", "DONE"] as const;

export const BoardSchema = z.object({
  name: z.string(),
  columns: z.array(
    z.object({
      name: z.enum(STATUS),
    })
  ),
});

export type BoardSchema = z.infer<typeof BoardSchema>;
