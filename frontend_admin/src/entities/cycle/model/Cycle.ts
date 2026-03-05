import { z } from "zod";

export const CycleSchema = z
  .object({
    cycleId: z.string(),
    cycleName: z.string(),
    authorId: z.string(),
    booksInCycle: z.array(z.string()),
  });

export type Cycle = z.infer<typeof CycleSchema>;

export const CycleList = z.array(CycleSchema);

export type CycleList = z.infer<typeof CycleList>;
