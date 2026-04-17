import { getItem, setItem, WithNull } from "../frontend_admin/src/shared/lib/storage/localStorage";
import { Product } from "../frontend_admin/src/entities/product/model/Product";

type NewProduct = WithNull<Product>;

export const getProduct = () => {
    return getItem<NewProduct>("product");
}

export const setProduct = (product: NewProduct) => {
    return setItem<NewProduct>("product", product);
}
