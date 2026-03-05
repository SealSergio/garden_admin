import { z } from "zod";

export const AuthorSchema = z.object({
    id: z.string(),
    surname: z.string(),
    name: z.string(),
    secondName: z.string().optional(),
    fullname: z.string(),
    abbreviatedName: z.string(),
});

export type Author = z.infer<typeof AuthorSchema>;

export const AuthorList = z.array(AuthorSchema);

export type AuthorList = z.infer<typeof AuthorList>;

export type AuthorData = Author | null;
