import { z } from "zod";

export const ProductSchema = z.object({
    id: z.string().length(5),
    title: z.string().min(1),
    authorId: z.string().length(3),
    description: z.string().min(20)
});

export type Product = z.infer<typeof ProductSchema>;

export const ProductList = z.array(ProductSchema);

export type ProductList = z.infer<typeof ProductList>;
