import { z } from "zod";

export const GenreSchema = z.object({
    genreTitle: z.string(),
});

export type Genre = z.infer<typeof GenreSchema>;

export const GenreList = z.array(GenreSchema);

export type GenreList = z.infer<typeof GenreList>;
