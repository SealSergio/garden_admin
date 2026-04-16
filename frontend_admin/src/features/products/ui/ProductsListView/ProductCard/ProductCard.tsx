import { FC } from "react";
import "./ProductCard.scss";
import { Product } from "../../../../../entities/product/model/Product.js";

interface ProductCardProps {
  product: Product;
}

export const ProductCard: FC<ProductCardProps> = ({product}) => {
    function handleClickOnBtnMore () {
        console.log(product)
    }

    return (
        <>
            <div className="product-image">
                <img src={`../../../../../public/img/products/template.webp`} alt="Изделие"/>
                {/* <img src={`../../../../../public/img/products/${product.id}.jpg`} alt="Изделие"/> */}
            </div>
            <div className="product-details">
                <div className="product-details__left">
                    <h3 className="product-title">{product.title}</h3>
                    <h3 className="product-price">{product.price}&nbsp;₽</h3>
                </div>
                <div className="product-details__right">
                    <button onClick={handleClickOnBtnMore} className="details-btn">
                        <svg version="1.0" xmlns="http://www.w3.org/2000/svg"
                            width="512.000000pt" height="512.000000pt" viewBox="0 0 512.000000 512.000000"
                            preserveAspectRatio="xMidYMid meet">

                            <g transform="translate(0.000000,512.000000) scale(0.100000,-0.100000)" stroke="none">
                            <path d="M3850 4935 c-36 -8 -103 -33 -149 -56 -76 -37 -103 -59 -253 -208
                            l-169 -166 565 -564 565 -565 140 133 c198 188 258 272 296 416 19 76 19 210
                            -1 289 -33 129 -73 186 -279 394 -110 112 -217 212 -255 237 -131 87 -314 123
                            -460 90z"/>
                            <path d="M1869 3087 c-756 -753 -1183 -1186 -1197 -1212 -31 -62 -284 -1069
                            -285 -1135 -1 -138 95 -242 240 -260 65 -8 82 -5 586 121 285 71 537 139 560
                            150 42 21 1449 1416 2109 2091 l300 308 -557 552 c-307 304 -563 554 -569 555
                            -6 1 -540 -525 -1187 -1170z"/>
                            </g>
                        </svg>
                    </button>
                </div>
            </div>
        </>
    )
}
