import { useEffect, useRef, useState } from "react";
import { GenreList, GenreSchema, Genre } from "../../../../../entities/genre/model/Genre";
import "./GenresForm.scss";
import { getNewGenre, setNewGenre } from "../../api/localStorage";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

interface GenresFormProps {
    genres: GenreList | undefined,
}

export const GenresForm: React.FC<GenresFormProps> = ({genres}) => {
    const newGenre = getNewGenre();

    const [newGenreTitle, setNewGenreTitle] = useState<string | null>(newGenre?.genreTitle || null);

    const [isDuplication, setIsDuplication] = useState<boolean>(false);

    const isInitialMount = useRef(true);

    useEffect(() => {
        if (isInitialMount.current) {
            isInitialMount.current = false;
        } else {
            setNewGenre({
                genreTitle: newGenreTitle,
            });
        }
    }, [newGenreTitle]);

    useEffect(() => {
        checkForDuplication();
    }, [newGenreTitle]);

    function checkForDuplication() {
        if (newGenreTitle && genres?.some((genre) => genre.genreTitle.toLowerCase() === newGenreTitle.toLowerCase())) {
            setIsDuplication(true);
        } else {
            setIsDuplication(false);
        }
    };

    const {register, handleSubmit, setValue, formState: { errors }} = useForm({
        resolver: zodResolver(GenreSchema),
    });

    const onSubmit = (data: Genre | unknown) => {
        fetch('api/genres', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })

        .then(response => {
            if(!response.ok) {
                throw new Error('Сетевая ошибка: ' + response.statusText);
            }
            return response.json();
        })

        .then(data => {
            console.log('Успех:', data)
        })

        .catch((error) => {
            console.error('Ошибка:', error);
        })
    };

    return (
        <div className="genre-form-wrapper">
            <h2 className="genre-form__title">Добавить жанр</h2>
            <form className="genre-form" onSubmit={handleSubmit(onSubmit)}>
                <label className="form__label genre-form__label">
                    <span className="form__label__title">
                        Жанр
                    </span>
                    <input
                        className="form__input"
                        type="text"
                        placeholder="Жанр"
                        {...register("genreTitle")}
                        value={newGenreTitle || ""}
                        onInput={(event) => setNewGenreTitle(event.currentTarget.value.trim())}
                    />
                    {errors.genreTitle && <p>Введите название жанра</p>}
                    {isDuplication && (
                        <span className="form__label__error">Такой жанр уже существует</span>
                    )}
                </label>
                <button className="form__btn form__btn--submit" type="submit" onClick={() => console.log(errors)}>
                    Сохранить
                </button>
                <button className="form__btn form__btn--reset" type="button">
                    Удалить
                </button>
            </form>
        </div>
    )
}