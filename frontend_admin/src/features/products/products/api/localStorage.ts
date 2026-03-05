import { getItem, setItem, WithNull } from "../../../../shared/lib/storage/localStorage";
import { Product } from "../../../../entities/product/model/Product";

type NewProduct = WithNull<Product>;

export const getNewProduct = () => {
    return getItem<NewProduct>("newProduct");
}

export const setNewProduct = (newProduct: NewProduct) => {
    return setItem<NewProduct>("newProduct", newProduct);
}
