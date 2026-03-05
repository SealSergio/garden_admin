import { getItem, setItem, WithNull } from "../../../../shared/lib/storage/localStorage";
import { Author } from "../../../../entities/author/model/Author";

type NewAuthor = WithNull<Author>;

export const getNewAuthor = () => {
    return getItem<NewAuthor>("newAuthor");
}

export const setNewAuthor = (newAuthor: NewAuthor) => {
    return setItem<NewAuthor>("newAuthor", newAuthor);
}
