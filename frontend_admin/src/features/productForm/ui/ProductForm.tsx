import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
// import { Link } from 'react-router-dom';
import TextareaAutosize from "react-textarea-autosize";
import "./ProductForm.scss";
import { ProductList, ProductSchema, Product } from '../../../entities/product/model/Product.js';
import { getProduct, setProduct } from '../../../../../api/localStorage.js';
import { useProductForm } from '../hooks/useProductForm.js';
import { createSlider } from '../../../shared/components/Slider/Slider.js';

export const ProductForm = () => {
    const { isOpen, data: product, action, closeForm } = useProductForm();
    
    const productId = product?.id || null;
    const [productTitle, setProductTitle] = useState<string | null>(product?.title || null);
    const [productPrice, setProductPrice] = useState<string | null>(product?.price || null);
    const [productDescription, setProductDescription] = useState<string[]>(product?.description || [""]);
    
    const isInitialMount = useRef(true);

    useEffect(() => {
        if (isInitialMount.current) {
            isInitialMount.current = false;
        } else {
            setProduct({
                id: productId,
                title: productTitle,
                price: "",
                numberOfPhotos: product?.numberOfPhotos || 0,
                description: productDescription
            });
        }
    }, [productTitle, productPrice, productDescription ]);

    function setDescription(description: string, index: number) {
        setProductDescription(productDescription.with(index, description));
    }

    function handleKeyDown(event: React.KeyboardEvent<HTMLInputElement>) {
        if (event.key === "Enter") {
            event.preventDefault();
            createNewString();
        }
    }

    function createNewString() {
        if (productDescription.at(-1) !== "") {
            setProductDescription([...productDescription, ""]);
        }
    }

    const {register, handleSubmit, setValue, formState: { errors }} = useForm({
        resolver: zodResolver(ProductSchema),
    });

    const onSubmit = (data: Product | unknown) => {
        fetch('api/products', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })

        .then(response => {
            if (!response.ok) {
                throw new Error('Сетевая ошибка: ' + response.statusText);
            }
            return response.json();
        })

        .then(data => {
            console.log('Успех:', data);
        })

        .catch((error) => {
            console.error('Ошибка:', error);
        });
    };

    const slider = createSlider({ product });
    
    if (!isOpen) return null;

    if (isOpen) return (
        <div className="product-form-wrapper">
            <div className="product-form-inner">
                <div className="product-form__half product-form__half--left">
                    {slider ? slider : (
                        <p className="">Нет фото</p>
                    )} 
                </div>
                <div className="product-form__half product-form__half--right">
                    <h2 className="product-form__title">Добавить изделие</h2>
                    <button className='btn-reset' onClick={closeForm}>
                        <svg width="16px" height="16px" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                            <path fillRule="evenodd" d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
                        </svg>
                    </button>
                    <form className="product-form" onSubmit={handleSubmit(onSubmit)}>
                        <label className="form__label product-form__label">
                            <span className="form__label__title">Название</span>
                            <input
                                className="form__input product-form__input"
                                type="text" placeholder="Название"
                                {...register("title")}
                                value={productTitle || ""}
                                onInput={(event) => setProductTitle(event.currentTarget.value)}
                            />
                            {errors.title && <p>Укажите название</p>}
                        </label>
                        <label className="form__label product-form__label">
                            <span className="form__label__title">Цена</span>
                            <input
                                className="form__input product-form__input"
                                type="text" placeholder="Цена"
                                {...register("price")}
                                value={productPrice || ""}
                                onInput={(event) => setProductPrice(event.currentTarget.value)}
                            />
                            {errors.title && <p>Укажите цену</p>}
                        </label>
                        <label className="form__label product-form__label">
                            <span className="form__label__title">Описание</span>
                            <div className="product-form__description">
                                {productDescription?.map((text, index)=> (
                                    <TextareaAutosize
                                        className="form__input product-form__input"
                                        key={index}
                                        placeholder="Текст"
                                        onInput={(event) => setDescription(event.currentTarget.value, index)}
                                        value={text || ""}
                                        >
                                    </TextareaAutosize>
                                ))}
                            </div>
                            <button
                                className="form__btn product-form__btn-add"
                                type="button"
                                onClick={() => createNewString()}>
                                +
                            </button>
                        </label>
                        <button
                            className="form__btn form__btn--submit"
                            type="submit"
                            onClick={() => console.log(Object.keys(errors).length > 0 ? errors : "Ошибок нет")}>
                            Сохранить
                        </button>
                        <button className="form__btn form__btn--reset" type="button">
                            Удалить
                        </button>
                    </form>
                </div>
            </div>
        </div>
    )
}
