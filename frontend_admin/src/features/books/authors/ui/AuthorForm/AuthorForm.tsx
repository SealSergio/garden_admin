import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { AuthorList } from "../../../../../entities/author/model/Author";
import { Author, AuthorSchema } from "../../../../../entities/author/model/Author";
import "./AuthorForm.scss";
import { getNewAuthor, setNewAuthor } from '../../api/localStorage';

interface AuthorFormProps {
    authors: AuthorList | undefined
}

export const AuthorForm: React.FC<AuthorFormProps> = ({ authors }) => {
    const newAuthor = getNewAuthor();
    
    const [newAuthorId, setNewAuthorId] = useState<string | null>(newAuthor?.id || null);
    const [newAuthorSurname, setNewAuthorSurname] = useState<string | null>(newAuthor?.surname || null);
    const [newAuthorName, setNewAuthorName] = useState<string | null>(newAuthor?.name || null);
    const [newAuthorSecondName, setNewAuthorSecondName] = useState<string | null>(newAuthor?.secondName || null);
    const [newAuthorFullname, setNewAuthorFullname] = useState<string | null>(newAuthor?.fullname || null);
    const [newAuthorAbbreviatedName, setNewAuthorAbbreviatedName] = useState<string | null>(newAuthor?.abbreviatedName || null);
    
    const [showIdMessage, setShowIdMessage] = useState(false);
    const [showFullnameMessage, setShowFullnameMessage] = useState(false);

    const [isDuplication, setIsDuplication] = useState(false);

    const isInitialMount = useRef(true);

    useEffect(() => {
        if (isInitialMount.current) {
            isInitialMount.current = false;
        } else {
            setNewAuthor({
                id: newAuthorId,
                surname: newAuthorSurname,
                name: newAuthorName,
                secondName: newAuthorSecondName || null,
                fullname: newAuthorFullname,
                abbreviatedName: newAuthorAbbreviatedName,
            });
        }
    }, [newAuthorId, newAuthorSurname, newAuthorName, newAuthorSecondName, newAuthorFullname, newAuthorAbbreviatedName]);

    useEffect(() => {
        generateFullname();
        generateAbbreviatedName();
    }, [newAuthorSurname, newAuthorName, newAuthorSecondName]);

    const {register, handleSubmit, setValue, formState: { errors }} = useForm({
        resolver: zodResolver(AuthorSchema),
    });

    useEffect(() => {
        checkForDuplication();
    }, [newAuthorFullname]);

    function generateFullname() {
        if (newAuthorSurname && newAuthorName) {
            const generatedFullname = newAuthorSecondName !== null ?
            `${newAuthorName} ${newAuthorSecondName} ${newAuthorSurname}` :
            `${newAuthorName} ${newAuthorSurname}`;

            setNewAuthorFullname(generatedFullname);
        } else {
            setNewAuthorFullname(null);
        }
    };
    
    function generateAbbreviatedName() {
        if (newAuthorSurname && newAuthorName) {
            const generatedAbbreviatedName = newAuthorSecondName ?
            `${newAuthorName[0]}. ${newAuthorSecondName[0]}. ${newAuthorSurname}` :
            `${newAuthorName[0]}. ${newAuthorSurname}`;

            setNewAuthorAbbreviatedName(generatedAbbreviatedName);
        } else {
            setNewAuthorAbbreviatedName(null);
        }
    };

    function checkForDuplication() {
        const isDuplication = authors?.some(author => author.fullname === newAuthorFullname);
        if (isDuplication) {
            setIsDuplication(true);
        } else {
            setIsDuplication(false);
        }
    };

    const onSubmit = (data: Author | unknown) => {
        fetch('api/authors', {
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
        <div className="author-form-wrapper">
            <h2 className="author-form__title">Добавить автора</h2>
            <form className="author-form" onSubmit={handleSubmit(onSubmit)}>
                <div className="author-form__half author-form__half--left">
                    <label className="form__label author-form__label">
                        <span className="form__label__title">
                            {showIdMessage ? "ID генерируется автоматически" : " ID"}
                        </span>
                        <input
                            className="form__input author-form__input author-form__input--auto-generated"
                            type="text"
                            placeholder="ID"
                            readOnly
                            {...register("id")}
                            value={newAuthorId ? newAuthorId : ""}
                            onMouseEnter={() => setShowIdMessage(true)}
                            onMouseLeave={() => setShowIdMessage(false)}
                        />
                    </label>
                    <label className="form__label author-form__label">
                        <span className="form__label__title">Фамилия</span>
                        <input
                            className="form__input author-form__input"
                            type="text" placeholder="Фамилия"
                            {...register("surname")}
                            value={newAuthorSurname || ""}
                            onInput={(event) => setNewAuthorSurname(event.currentTarget.value.trim())}
                        />
                        {errors.surname && <p>Фамилия обязательна</p>}
                    </label>
                    <label className="form__label author-form__label">
                        <span className="form__label__title">Имя</span>
                        <input
                            className="form__input author-form__input"
                            type="text" placeholder="Имя"
                            {...register("name")}
                            value={newAuthorName || ""}
                            onInput={(event) => setNewAuthorName(event.currentTarget.value.trim())}
                        />
                        {errors.surname && <p>Имя обязательно</p>}
                    </label>
                    <label className="form__label author-form__label">
                        <span className="form__label__title">Второе имя / отчество</span>
                        <input
                            className="form__input author-form__input"
                            type="text" placeholder="Второе имя / отчество"
                            {...register("secondName")}
                            value={newAuthorSecondName || ""}
                            onInput={(event) => setNewAuthorSecondName(event.currentTarget.value.trim())}
                        />
                    </label>
                    <label className="form__label author-form__label">
                        <span className="form__label__title">
                            {showFullnameMessage ? "Полное имя генерируется автоматически" : " Полное имя"}
                        </span>
                        <input
                            className="form__input author-form__input author-form__input--auto-generated"
                            type="text"
                            placeholder="Полное имя"
                            readOnly
                            {...register("fullname")}
                            value={newAuthorFullname || ""}
                            onMouseEnter={() => setShowFullnameMessage(true)}
                            onMouseLeave={() => setShowFullnameMessage(false)}
                        />
                        {isDuplication &&
                            <span className='form__label__error'>Такой автор уже существует</span> 
                        }
                    </label>
                    <label className="form__label author-form__label">
                        <span className="form__label__title">Сокращенное имя</span>
                        <input
                            className="form__input author-form__input"
                            type="text"
                            placeholder="Сокращенное имя"
                            {...register("abbreviatedName")}
                            value={newAuthorAbbreviatedName || ""}
                        />
                    </label>
                    <button className="form__btn form__btn--submit" type="submit" onClick={() => console.log(errors)}>
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
