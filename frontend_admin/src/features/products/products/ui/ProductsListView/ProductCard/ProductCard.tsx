import { FC } from "react";
import "./ProductCard.scss";
import { Product } from "../../../../../../entities/product/model/Product";

interface ProductCardProps {
  product: Product;
}

export const ProductCard: FC<ProductCardProps> = ({product}) => {
    function handleClickOnBtnMore () {

    }

    return (
        <>
            <div className="product-image">
                <img src={`img/products/${product.id}.jpg`} alt="Изделие"/>
            </div>
            <div className="product-details">
                <h3 className="product-title">{product.title}</h3>
                <button onClick={handleClickOnBtnMore} className="details-btn">Подробнее</button>
            </div>        
        </>
    )
}
