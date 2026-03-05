import { getItem, setItem, WithNull } from "../../../../shared/lib/storage/localStorage";
import { Book } from "../../../../entities/book/model/Book";

type NewBook = WithNull<Book>;

export const getNewBook = () => {
    return getItem<NewBook>("newBook");
}

export const setNewBook = (newBook: NewBook) => {
    return setItem<NewBook>("newBook", newBook);
}
