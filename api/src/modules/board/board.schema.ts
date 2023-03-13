import { z } from "zod";

export const BoardSchema = z.object({
  name: z.string(),
});

export type BoardSchema = z.infer<typeof BoardSchema>;
