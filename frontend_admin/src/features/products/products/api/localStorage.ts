import { getItem, setItem, WithNull } from "../../../../shared/lib/storage/localStorage";
import { Product } from "../../../../entities/product/model/Product";

type NewProduct = WithNull<Product>;

export const getProduct = () => {
    return getItem<NewProduct>("product");
}

export const setProduct = (product: NewProduct) => {
    return setItem<NewProduct>("product", product);
}
