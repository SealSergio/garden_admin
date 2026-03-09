import { z } from "zod";

export const ProductSchema = z.object({
    id: z.string().length(3),
    title: z.string().min(1),
    description: z.array(z.string()).optional(),
});

export type Product = z.infer<typeof ProductSchema>;

export const ProductList = z.array(ProductSchema);

export type ProductList = z.infer<typeof ProductList>;
