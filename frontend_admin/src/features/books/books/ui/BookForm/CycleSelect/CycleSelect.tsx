import { useEffect, useRef, useState } from "react";
import { useSelect } from "../../../../../../shared/hooks/useSelect";
import "./CycleSelect.scss";
import { DragDropContext, Droppable, Draggable, DropResult } from "react-beautiful-dnd";
import { useGetAllBooksQuery } from "../../../api/books";
import { Link } from "react-router-dom";

type Cycle = {
    cycleId: string,
    cycleName: string,
    authorId: string,
    booksInCycle: string[],
};

interface CycleSelectProps {
    cycles: Cycle[],
    newBookCycle: Cycle,
    setNewBookCycle: React.Dispatch<React.SetStateAction<Cycle | null>>,
    newBookAuthorId: string,
    newBookTitle: string,
}

export const CycleSelect: React.FC<CycleSelectProps> = ({
    cycles,
    newBookCycle,
    setNewBookCycle,
    newBookAuthorId,
    newBookTitle,
}) => {
    const { data: books } = useGetAllBooksQuery();
    const [filteredCycles, setFilteredCycles] = useState<Cycle[]>(
        cycles.filter(cycle => (cycle.authorId === newBookAuthorId
    )));
    const [cycleName, setCycleName] = useState<string>(
        newBookCycle.cycleName !== "" ? newBookCycle.cycleName
        : ((filteredCycles.length === 1) ? filteredCycles[0].cycleName
        : "")
    );
    const [booksInCycle, setBooksInCycle] = useState<string[]>(newBookCycle.booksInCycle);
    const inputRef = useRef<HTMLInputElement>(null);
    
    useEffect(() => {
        setFilteredCycles(cycles.filter(cycle => (
            cycle.authorId === newBookAuthorId) &&
            cycle.cycleName.toLowerCase().includes(cycleName.toLowerCase()
        )));
    }, [newBookAuthorId, cycleName]);

    useEffect(() => {
        setNewBookCycle({
            ...newBookCycle,
            cycleId: cycles.find(cycle => cycle.cycleName === cycleName)?.cycleId || "",
            cycleName: cycleName,
        });
    }, [cycleName]);

    useEffect(() => {
        setNewBookCycle({
            ...newBookCycle,
            authorId: newBookAuthorId,
        });
    }, [newBookAuthorId]);

    useEffect(() => {
        setNewBookCycle({
            ...newBookCycle,
            booksInCycle: booksInCycle,
        });
    }, [booksInCycle]);

    useEffect(() => {
        if (filteredCycles.length === 1) {
            setBooksInCycle([...filteredCycles[0].booksInCycle, newBookTitle])
        } else {
            setBooksInCycle([newBookTitle])
        }
    }, [filteredCycles]);

    const {
        selectRef: cycleSelectRef,
        openSelect: openCycle,
        isOpen: isCycleSelectOpen
    } = useSelect<HTMLDivElement>();

    function handleClickOnCheckbox(newCycleName: string) {
        if (newCycleName === cycleName) {
            setCycleName("");
            setFilteredCycles(cycles);
            if (inputRef.current) {
                inputRef.current.focus();
            }
        } else {
            setCycleName(newCycleName)
        }
    };

    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        event.stopPropagation();

        if (event.key === 'Enter') {
            if (filteredCycles.length === 1) {
                handleClickOnCheckbox(filteredCycles[0].cycleName)
            }
        }

        if (inputRef.current) {
            inputRef.current.focus();
        }
    };

    function handleDragEnd(result: DropResult) {
        if (!result.destination) return;

        const newItems = Array.from(newBookCycle.booksInCycle);
        const [removed] = newItems.splice(result.source.index, 1);
        newItems.splice(result.destination.index, 0, removed);

        setNewBookCycle({
            ...newBookCycle,
            booksInCycle: newItems,
        });
    };

    return (
        <>
            <div className="genres-input-wrapper form__input" ref={cycleSelectRef} onFocus={openCycle}>
                <input
                    className="form__input book-form__input genres-input"
                    type="text"
                    placeholder="Цикл"
                    value={cycleName}
                    ref={inputRef}
                    onInput={(event) => setCycleName(event.currentTarget.value)}
                    onKeyDown={(event) => {
                        event.stopPropagation();
                        handleKeyDown(event);
                    }}
                />
                {isCycleSelectOpen && (
                    <div className="optionListWrapper">
                        <Link to={"/"}>Новый цикл</Link>
                        <ul className="optionList">
                            {filteredCycles.length > 0 ? (
                                filteredCycles.map((cycle) => (
                                    <label key={cycle.cycleId} className="filter-option optionItem">
                                        <input
                                            type="checkbox"
                                            name="cycle"
                                            checked={cycle.cycleName === cycleName ? true : false}
                                            onChange={() => handleClickOnCheckbox(cycle.cycleName)}/>
                                        {cycle.cycleName}
                                    </label>
                            ))
                            ) : (
                                <span className="noGenres">Циклы не найдены</span>
                            )}
                        </ul>
                    </div>
                )}
            </div>
            {(Boolean(cycleName)) && (
                <ul className="genres-list">
                    {(newBookCycle.booksInCycle && newBookCycle.booksInCycle.length > 0) && (
                        <DragDropContext onDragEnd={handleDragEnd}>
                            <Droppable droppableId="droppable" direction="vertical">
                                {(provided) => (
                                <ul className="genres-list" {...provided.droppableProps} ref={provided.innerRef}>
                                    {newBookCycle.booksInCycle.map((item, index) => (
                                        <Draggable key={item} draggableId={item} index={index}>
                                            {(provided) => (
                                            <li
                                                ref={provided.innerRef}
                                                {...provided.draggableProps}
                                                {...provided.dragHandleProps}
                                                className="genres-item"
                                            >
                                                {item === newBookTitle ? item : (books?.find(book => book.id === item))?.title}
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
                </ul>
            )}
        </>
    )
}
