import { FC, useState } from "react";
import { Product } from "../../../entities/product/model/Product.js";
import './Slider.scss';

interface createSliderProps {
    product: Product | null
}

export const createSlider: FC<createSliderProps> = ({ product }) => {
    const [slideIndex, setSlideIndex] = useState(0);

    if (product !== null) {
        function showPreviousSlide() {
            let newSlideIndex = slideIndex - 1;
            if (product && newSlideIndex === -1) {
                newSlideIndex = product.numberOfPhotos - 1;
            }
            setSlideIndex(newSlideIndex);
        }

        function showNextSlide() {
            let newSlideIndex = slideIndex + 1;
            if (product && newSlideIndex === product.numberOfPhotos) {
                newSlideIndex = 0;
            }
            setSlideIndex(newSlideIndex);
        }

        return (
            <div className="slider__container">
                <div className="slider">
                    {product.numberOfPhotos > 0 ?
                        Array.from({ length: product.numberOfPhotos }, (_, index) => (
                        <img
                            key={index}
                            className="slider__img"
                            style={{ display: index === slideIndex ? 'block' : 'none' }}
                            src={`../../../../../public/img/products/${product.id}-${index + 1}.webp`}
                            alt={product.title}
                        />
                        ))
                        : <p className="slider__text">Нет фото</p>
                    }
                </div>
                {product.numberOfPhotos > 1 && 
                    <>
                        <button
                            onClick={showPreviousSlide}
                            className="slider__button prev-button"
                            aria-label="Посмотреть предыдущий слайд">
                            <img
                                className="slider__button__img"
                                src="../../../../../public/img/icons/prev-button.png">
                            </img>
                        </button>
                        <button
                            onClick={showNextSlide}
                            className="slider__button next-button"
                            aria-label="Посмотреть следующий слайд">
                            <img
                                className="slider__button__img"
                                src="../../../../../public/img/icons/next-button.png">
                            </img>
                        </button>
                    </>
                }
            </div>
        )
    }
}