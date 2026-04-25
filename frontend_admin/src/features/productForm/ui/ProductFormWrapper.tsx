import { useProductForm } from "../hooks/useProductForm.js";
import { ProductForm } from "./ProductForm.js";

export const ProductFormWrapper = () => {
    const { isOpen } = useProductForm();

    return isOpen ? <ProductForm />  : null;
}
