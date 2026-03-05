import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import TextareaAutosize from "react-textarea-autosize";
import { Select } from '../../../../../shared/components/Select/Select';
import { useSelect } from '../../../../../shared/hooks/useSelect';
import { AuthorList } from "../../../../../entities/author/model/Author";
import { Book, BookList, BookSchema } from "../../../../../entities/book/model/Book";
import { GenresSelect } from './GenreSelect/GenreSelect';
import "./BookForm.scss";
import { getNewBook, setNewBook } from '../../api/localStorage';
import { Cycle, CycleList } from '../../../../../entities/cycle/model/Cycle';
import { CycleSelect } from './CycleSelect/CycleSelect';
import { GenreList } from '../../../../../entities/genre/model/Genre';

interface BookFormProps {
    books: BookList,
    genres: GenreList,
    authors: AuthorList,
    cycles: CycleList,
}

export const BookForm: React.FC<BookFormProps> = ({ books, genres, authors, cycles }) => {
    const newBook = getNewBook();
    
    const [newBookId, setNewBookId] = useState<string | null>(newBook?.id || null);
    const [newBookTitle, setNewBookTitle] = useState<string | null>(newBook?.title || null);
    const [newBookQuantity, setNewBookQuantity] = useState<number>(newBook?.quantity || 0);
    const [newBookGenres, setNewBookGenres] = useState<GenreList>(newBook?.genres || []);
    const [newBookAge, setNewBookAge] = useState<string | null>(newBook?.age || null);
    const [newBookAuthor, setNewBookAuthor] = useState<{id: string, fullname: string} | null>(
        newBook?.authorId && authors.find(author => author.id === newBook.authorId) || null
    );
    const [newBookDescription, setNewBookDescription] = useState<string>(newBook?.description || "");

    const [isPartOfCycle, setIsPartOfCycle] = useState<boolean>(newBook?.isPartOfCycle || false);
    const [newBookCycle, setNewBookCycle] = useState<Cycle | null>(newBook?.cycle || null);
    
    const [showCycleMessage, setShowCycleMessage] = useState(false);
    const [showIdMessage, setShowIdMessage] = useState(false);

    const {
            selectRef: ageSelectRef,
            handleToggle: toggleAge,
            isOpen: isAgeSelectOpen
        } = useSelect<HTMLLabelElement>();

    const {
            selectRef: authorSelectRef,
            handleToggle: toggleAuthor,
            isOpen: isAuthorSelectOpen
        } = useSelect<HTMLLabelElement>();


    const isInitialMount = useRef(true);

    useEffect(() => {
        if (isInitialMount.current) {
            isInitialMount.current = false;
        } else {
            setNewBook({
                id: newBookId,
                title: newBookTitle,
                authorId: newBookAuthor?.id || null,
                description: newBookDescription,
                genres: newBookGenres,
                quantity: newBookQuantity,
                age: newBookAge,
                isPartOfCycle: isPartOfCycle,
                cycle: newBookCycle,
            });
        }
    }, [newBookTitle, newBookGenres, newBookDescription, newBookQuantity, newBookAge, isPartOfCycle, newBookCycle]);

    function toggleCycleCheckbox() {
        function getSingleCycle() {
            const filteredCycles = cycles.filter(cycle => (cycle.authorId === newBookAuthor?.id));
            return (filteredCycles.length === 1) ? filteredCycles[0] : null;
        };

        if (!isPartOfCycle && newBookAuthor && newBookTitle && !newBookCycle) {
            setIsPartOfCycle(true);
            const singleCycle = getSingleCycle();
            setNewBookCycle({
                cycleId: singleCycle?.cycleId || "",
                cycleName: singleCycle?.cycleName || "",
                authorId: newBookAuthor.id,
                booksInCycle: [newBookTitle],
            });
        } else if (isPartOfCycle) {
            setIsPartOfCycle(false);
            setNewBookCycle(null);
        }
    };

    useEffect(() => {
        if ((!Boolean(newBookTitle) || !Boolean(newBookAuthor)) && isPartOfCycle) {
            setIsPartOfCycle(false);
            setNewBookCycle(null);
        }
    }, [newBookAuthor, newBookTitle]);

    const {register, handleSubmit, setValue, formState: { errors }} = useForm({
        resolver: zodResolver(BookSchema),
    });

    useEffect(() => {
        (newBookGenres.length > 0) && setValue("genres", newBookGenres);
    }, [newBookGenres, setValue]);

    useEffect(() => {
        newBookAge && setValue("age", newBookAge);
    }, [newBookAge, setValue]);

    useEffect(() => {
        if (newBookAuthor) {
            const lastBook = books.filter(book => book.authorId === newBookAuthor.id).at(-1);
            const generatedNewBookId = lastBook ? 
                String(Number(lastBook.id) + 1).padStart(5, "0") :
                newBookAuthor.id + "01";

            setNewBookId(generatedNewBookId);

            newBookId && setValue("id", newBookId);

            setValue("authorId", newBookAuthor.id);
        }
    }, [newBookAuthor, setValue]);

    useEffect(() => {
        setValue("isPartOfCycle", isPartOfCycle);
    }, [isPartOfCycle, setValue]);

    useEffect(() => {
        setValue("cycle", newBookCycle || undefined);
    }, [newBookCycle, setValue]);

    const onSubmit = (data: Book | unknown) => {
        fetch('api/books', {
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
        <div className="book-form-wrapper">
            <h2 className="book-form__title">Добавить книгу</h2>
            <form className="book-form" onSubmit={handleSubmit(onSubmit)}>
                <div className="book-form__half book-form__half--left">
                    <label className="form__label book-form__label">
                        <span className="form__label__title">
                            {showIdMessage ? "ID генерируется автоматически" : " ID"}
                        </span>
                        <input
                            className="form__input book-form__input book-form__input--id"
                            type="text"
                            placeholder="ID"
                            readOnly
                            {...register("id")}
                            value={newBookId ? newBookId : ""}
                            onMouseEnter={() => setShowIdMessage(true)}
                            onMouseLeave={() => setShowIdMessage(false)}
                        />
                    </label>
                    <label className="form__label book-form__label">
                        <span className="form__label__title">Заголовок</span>
                        <input
                            className="form__input book-form__input"
                            type="text" placeholder="Заголовок"
                            {...register("title")}
                            value={newBookTitle || ""}
                            onInput={(event) => setNewBookTitle(event.currentTarget.value)}
                        />
                        {errors.title && <p>Заголовок должен содержать не менее 1 символа</p>}
                    </label>
                    <label className="form__label book-form__label label--age" ref={authorSelectRef}>
                        <span className="form__label__title">Автор</span>
                        <button
                            className={`form__input book-form__input book-form__input--age ${newBookAuthor === null && "defaultValue"}`}
                            onClick={toggleAuthor}
                            {...register("authorId")}
                            type="button">
                            {newBookAuthor ? newBookAuthor.fullname : "Автор"}
                        </button>
                        {isAuthorSelectOpen && (
                            <ul className="ageList">
                                <Link to={"/authors"} className="new-autor-btn">
                                    Новый автор
                                </Link>
                                {authors.map((author) => (
                                    <li
                                        key={author.id}
                                        className="ageItem"
                                        onClick={() => setNewBookAuthor(author)}>
                                        {author.fullname}
                                    </li>
                                ))}
                        </ul>
                        )}
                    </label>
                    <label className="form__label book-form__label--checkbox book-form__label">
                        <span className="form__label__title">Часть цикла</span>
                        <input
                            className={`form__input book-form__input input--cycle ${(!newBookAuthor || !newBookTitle) && "disabled"}`}
                            type="checkbox"
                            readOnly={(newBookAuthor && newBookTitle) ? false : true}
                            checked={isPartOfCycle ? true : false}
                            onChange={toggleCycleCheckbox}
                            onMouseEnter={() => (!newBookAuthor || !newBookTitle) && setShowCycleMessage(true)}
                            onMouseLeave={() => setShowCycleMessage(false)}
                        />
                    </label>
                    {showCycleMessage &&
                        <span className="checkbox-message">Сначала укажите заголовок и автора</span>
                    }
                    {(isPartOfCycle && newBookAuthor && newBookCycle && newBookTitle) && (
                        <label className="form__label book-form__label">
                            <span className="form__label__title">Цикл</span>
                            <CycleSelect
                                cycles={cycles}
                                newBookCycle={newBookCycle}
                                setNewBookCycle={setNewBookCycle}
                                newBookAuthorId={newBookAuthor.id}
                                newBookTitle={newBookTitle}
                            />
                        </label>
                    )}
                </div>
                <div className="book-form__half">
                    <div className="book-form__img">Загрузите фото</div>
                    <label className="form__label book-form__label">
                        <span className="form__label__title">Описание</span>
                        <div className="input-descr-wrapper">
                            <TextareaAutosize
                                className="form__input book-form__input textarea-descr"
                                placeholder="Описание"
                                {...register("description")}
                                maxRows={8}
                                value={newBookDescription}
                                onInput={(event) => setNewBookDescription(event.currentTarget.value)}
                            />
                        </div>
                        {errors.description && <p>Описание должно содержать не менее 20 символов</p>}
                    </label>
                    <label className="form__label book-form__label">
                        <span className="form__label__title">Жанры</span>
                        <GenresSelect
                            genres={genres}
                            newBookGenres={newBookGenres}
                            setNewBookGenres={setNewBookGenres}
                        />
                    </label>
                    <label className="form__label book-form__label label--age" ref={ageSelectRef}>
                        <span className="form__label__title">Возраст</span>
                        <button
                            className={`form__input book-form__input book-form__input--age ${newBookAge === null && "defaultValue"}`}
                            onClick={toggleAge}
                            type="button">
                            {newBookAge ? newBookAge : "Возраст"}
                        </button>
                        {isAgeSelectOpen && (
                            <Select
                                items={["Любой", "0+", "6+", "12+", "16+"]}
                                handleClickOnItem={setNewBookAge}
                            />
                        )}
                    </label>
                    <label className="form__label book-form__label">
                        <span className="form__label__title">Количество экземпляров</span>
                        <input
                            className="form__input book-form__input"
                            type="number"
                            min="0"
                            max="1000"
                            placeholder="Экземпляры"
                            {...register("quantity", { valueAsNumber: true })}
                            value={newBookQuantity === 0 ? "" : newBookQuantity}
                            onInput={(event) => setNewBookQuantity(Number(event.currentTarget.value))}
                        />
                        {errors.quantity && <p>Должно быть не менее одного экземпляра</p>}
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
