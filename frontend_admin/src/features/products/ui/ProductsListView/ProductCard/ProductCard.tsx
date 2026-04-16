import { FC } from "react";
import "./ProductCard.scss";
import { Product } from "../../../../../entities/product/model/Product.js";

interface ProductCardProps {
  product: Product;
}

export const ProductCard: FC<ProductCardProps> = ({product}) => {
    function handleClickOnBtnMore () {

    }

    return (
        <>
            <div className="product-image">
                <img src={`../../../../../public/img/products/template.webp`} alt="Изделие"/>
                {/* <img src={`../../../../../public/img/products/${product.id}.jpg`} alt="Изделие"/> */}
            </div>
            <div className="product-details">
                <h3 className="product-title">{product.title}</h3>
                <button onClick={handleClickOnBtnMore} className="details-btn">Подробнее</button>
            </div>        
        </>
    )
}
