import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import TextareaAutosize from "react-textarea-autosize";
import "./ProductForm.scss";
import { ProductList, ProductSchema, Product } from '../../../../../entities/product/model/Product';
import { getProduct, setProduct } from '../../api/localStorage';

interface ProductFormProps {
    products: ProductList,
}

export const ProductForm: React.FC<ProductFormProps> = ({ products }) => {
    const product = getProduct();
    
    const productId = product?.id || null;
    const [productTitle, setProductTitle] = useState<string | null>(product?.title || null);
    const [productDescription, setProductDescription] = useState<string[]>(product?.description || [""]);

    const isInitialMount = useRef(true);

    useEffect(() => {
        if (isInitialMount.current) {
            isInitialMount.current = false;
        } else {
            setProduct({
                id: productId,
                title: productTitle,
                description: productDescription
            });
        }
    }, [productTitle, productDescription ]);

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

    return (
        <div className="product-form-wrapper">
            <h2 className="product-form__title">Добавить изделие</h2>
            <form className="product-form" onSubmit={handleSubmit(onSubmit)}>
                <div className="product-form__half product-form__half--left">
                    <label className="form__label product-form__label">
                        <span className="form__label__title">Название</span>
                        <input
                            className="form__input product-form__input"
                            type="text" placeholder="Название"
                            {...register("title")}
                            value={productTitle || ""}
                            onInput={(event) => setProductTitle(event.currentTarget.value)}
                        />
                        {errors.title && <p>Название должно содержать не менее 1 символа</p>}
                    </label>
                    <label className="form__label product-form__label">
                        <span className="form__label__title">Описание</span>
                        <div className="product-form__description">
                            {productDescription?.map((text, index)=> (
                                <input
                                    className="form__input product-form__input"
                                    key={index}
                                    placeholder="Текст"
                                    onKeyDown={(event) => handleKeyDown(event)}
                                    onInput={(event) => setDescription(event.currentTarget.value, index)}
                                    value={text || ""}
                                    >
                                </input>
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
                </div>
                {/* <div className="product-form__half">
                    <div className="product-form__img">Загрузите фото</div>
                </div> */}
            </form>
        </div>
    )
}
