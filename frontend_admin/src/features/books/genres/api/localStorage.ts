import { getItem, setItem, WithNull } from "../../../../shared/lib/storage/localStorage";
import { Genre } from "../../../../entities/genre/model/Genre";

type NewGenre = WithNull<Genre>;

export const getNewGenre = () => {
    return getItem<NewGenre>("newGenre");
}

export const setNewGenre = (newGenre: NewGenre) => {
    return setItem<NewGenre>("newGenre", newGenre);
}
