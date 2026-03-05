import { z } from 'zod';

export const AdminSchema = z.object({
    login: z.string(),
    surname: z.string(),
    name: z.string(),
    accessLevel: z.enum(['root', 'admin', 'guest'])
})

export type Admin = z.infer<typeof AdminSchema>;
