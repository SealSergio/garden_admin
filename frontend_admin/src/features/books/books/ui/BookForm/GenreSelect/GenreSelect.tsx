import { ChangeEvent, useEffect, useRef, useState } from "react";
import { useSelect } from "../../../../../../shared/hooks/useSelect";
import "./GenreSelect.scss";
import { DragDropContext, Droppable, Draggable, DropResult } from "react-beautiful-dnd";
import { GenreList } from "../../../../../../entities/genre/model/Genre";

interface GenresSelectProps {
    genres: GenreList,
    newBookGenres: GenreList,
    setNewBookGenres: React.Dispatch<React.SetStateAction<GenreList>>
}

export const GenresSelect: React.FC<GenresSelectProps> = ({ genres, newBookGenres, setNewBookGenres}) => {
    const [filteredOptions, setFilteredOptions] = useState<GenreList>(genres);
    const [inputValue, setInputValue] = useState<string>("");
    const inputRef = useRef<HTMLInputElement>(null);
    
    const {
        selectRef: genreSelectRef,
        openSelect: openGenre,
        isOpen: isGenreSelectOpen
    } = useSelect<HTMLDivElement>();

    function handleClickOnCheckbox(dataItem: string) {
        if (newBookGenres.some(genre => genre.genreTitle === dataItem)) {
            deleteOption(dataItem);
        } else {
            setNewBookGenres([...newBookGenres, {genreTitle: dataItem}]);
        }

        if (Boolean(inputValue)) {
            setInputValue("");
            setFilteredOptions(genres);
            if (inputRef.current) {
                inputRef.current.focus();
            }
        }
    };

    function deleteOption(dataItem: string) {
        setNewBookGenres(newBookGenres.filter(item => item.genreTitle !== dataItem));
    }

    function handleOnInput(event: ChangeEvent<HTMLInputElement>) {
        setInputValue(event.currentTarget.value);
    }

    useEffect(() => {
        const value = inputValue.toLowerCase().trim();
        if (Boolean(value)) {
            const filtredGenres = genres.filter(genre => genre.genreTitle.toLowerCase().includes(value));
            setFilteredOptions(filtredGenres);
        } else {
            setFilteredOptions(genres);
        }
    }, [inputValue]);

    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        event.stopPropagation();

        if (event.key === 'Enter') {
            if (filteredOptions.length === 1) {
                handleClickOnCheckbox(filteredOptions[0].genreTitle)
            }
        }

        if (inputRef.current) {
            inputRef.current.focus();
        }
    };

    function handleDragEnd(result: DropResult) {
        if (!result.destination) return;

        const newItems = Array.from(newBookGenres);
        const [removed] = newItems.splice(result.source.index, 1);
        newItems.splice(result.destination.index, 0, removed);

        setNewBookGenres(newItems);
    };

    return (
        <div className="genres-input-wrapper form__input" ref={genreSelectRef} onFocus={openGenre}>
            <ul className="genres-list">
                {newBookGenres.length > 0 && (
                    <DragDropContext onDragEnd={handleDragEnd}>
                        <Droppable droppableId="droppable" direction="vertical">
                            {(provided) => (
                            <ul className="genres-list" {...provided.droppableProps} ref={provided.innerRef}>
                                {newBookGenres.map((item, index) => (
                                    <Draggable key={item.genreTitle} draggableId={item.genreTitle} index={index}>
                                        {(provided) => (
                                        <li
                                            ref={provided.innerRef}
                                            {...provided.draggableProps}
                                            {...provided.dragHandleProps}
                                            className="genres-item"
                                        >
                                            {item.genreTitle}
                                            <svg
                                            onClick={() => deleteOption(item.genreTitle)}
                                            className="closeBtn"
                                            xmlns="http://www.w3.org/2000/svg" width="18px" height="18px" viewBox="0 0 16 16" >
                                            <path
                                                fillRule="evenodd"
                                                d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"
                                            />
                                            </svg>
                                        </li>
                                        )}
                                    </Draggable>
                                ))}
                                {provided.placeholder}
                            </ul>
                            )}
                        </Droppable>
                    </DragDropContext>
                )}
                <input
                    className="form__input book-form__input genres-input"
                    type="text"
                    placeholder="Жанры"
                    value={inputValue}
                    ref={inputRef}
                    onInput={handleOnInput}
                    onKeyDown={(event) => {
                        event.stopPropagation();
                        handleKeyDown(event);
                    }}
                />
            </ul>
            {isGenreSelectOpen && (
                <div className="optionListWrapper">
                    <ul className="optionList">
                        {filteredOptions.length > 0 ? (
                            filteredOptions.map((genre) => (
                            <label key={genre.genreTitle} className="filter-option optionItem">
                                <input
                                    type="checkbox"
                                    name="genre"
                                    checked={newBookGenres.some(currentGenre => currentGenre.genreTitle === genre.genreTitle)}
                                    onChange={() => handleClickOnCheckbox(genre.genreTitle)}/>
                                {genre.genreTitle}
                            </label>
                        ))
                        ) : (
                            <span className="noGenres">Жанры не найдены</span>
                        )}
                    </ul>
                </div>
            )}
        </div>
    )
}
