import { z } from "zod";
import { CycleSchema } from "../../cycle/model/Cycle";
import { GenreList } from "../../genre/model/Genre";

const commentSchema = z.object({
    author: z.string(),
    text: z.string(),
});

export const BookSchema = z.object({
    id: z.string().length(5),
    title: z.string().min(1),
    authorId: z.string().length(3),
    description: z.string().min(20),
    quantity: z.number().positive(),
    comments: z.array(commentSchema).optional(),
    genres: GenreList,
    age: z.string(),
    // language: z.string(),
    isPartOfCycle: z.boolean(),
    cycle: CycleSchema.optional(),
});

export type Book = z.infer<typeof BookSchema>;

export const BookList = z.array(BookSchema);

export type BookList = z.infer<typeof BookList>;
