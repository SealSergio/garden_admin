import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import TextareaAutosize from "react-textarea-autosize";
import "./ProductForm.scss";
import { ProductList, ProductSchema, Product } from '../../../../../entities/product/model/Product';
import { getNewProduct, setNewProduct } from '../../api/localStorage';

interface ProductFormProps {
    products: ProductList,
}

export const ProductForm: React.FC<ProductFormProps> = ({ products }) => {
    const newProduct = getNewProduct();
    
    const [newProductId, setNewProductId] = useState<string | null>(newProduct?.id || null);
    const [newProductTitle, setNewProductTitle] = useState<string | null>(newProduct?.title || null);
    const [newProductDescription, setNewProductDescription] = useState<string>(newProduct?.description || "");

    const [showIdMessage, setShowIdMessage] = useState(false);

    const isInitialMount = useRef(true);

    useEffect(() => {
        if (isInitialMount.current) {
            isInitialMount.current = false;
        } else {
            setNewProduct({
                id: newProductId,
                title: newProductTitle,
                description: newProductDescription
            });
        }
    }, [newProductTitle, newProductDescription ]);

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
                        <span className="form__label__title">
                            {showIdMessage ? "ID генерируется автоматически" : " ID"}
                        </span>
                        <input
                            className="form__input product-form__input product-form__input--id"
                            type="text"
                            placeholder="ID"
                            readOnly
                            {...register("id")}
                            value={newProductId ? newProductId : ""}
                            onMouseEnter={() => setShowIdMessage(true)}
                            onMouseLeave={() => setShowIdMessage(false)}
                        />
                    </label>
                    <label className="form__label product-form__label">
                        <span className="form__label__title">Заголовок</span>
                        <input
                            className="form__input product-form__input"
                            type="text" placeholder="Заголовок"
                            {...register("title")}
                            value={newProductTitle || ""}
                            onInput={(event) => setNewProductTitle(event.currentTarget.value)}
                        />
                        {errors.title && <p>Заголовок должен содержать не менее 1 символа</p>}
                    </label>
                </div>
                <div className="product-form__half">
                    <div className="product-form__img">Загрузите фото</div>
                    <label className="form__label product-form__label">
                        <span className="form__label__title">Описание</span>
                        <div className="input-descr-wrapper">
                            <TextareaAutosize
                                className="form__input product-form__input textarea-descr"
                                placeholder="Описание"
                                {...register("description")}
                                maxRows={8}
                                value={newProductDescription}
                                onInput={(event) => setNewProductDescription(event.currentTarget.value)}
                            />
                        </div>
                        {errors.description && <p>Описание должно содержать не менее 20 символов</p>}
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
            </form>
        </div>
    )
}
