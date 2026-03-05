import { FC } from "react";
import { ProductList } from "../../../../../entities/product/model/Product";
import { ProductCard } from "./ProductCard/ProductCard";
import "./ProductListView.scss";

export interface ProductListProps  {
    productList: ProductList;
}

export const ProductListView: FC<ProductListProps> = ({productList}) => {
    return (
        <ul className="products-grid">
            {productList.map((product) => (
                <li key={product.id} className="product-card">
                    <ProductCard product={product} />
                </li>
            ))}
        </ul>
    )
}
