import { ErrorMessage } from "../../../../../shared/components/Error/Error";
import { Loader } from "../../../../../shared/components/Loader/Loader";
import { useGetAllBooksQuery } from "../../../books/api/books";
import { useGetAllGenresQuery } from "../../api/genres";
import { GenresForm } from "../GenresForm/GenresForm";
import { GenresList } from "../GenresList/GenresList";
import "./GenresMain.scss";

export const GenresMain: React.FC = () => {
    const { data: genres, isError: gernesIsError, isLoading: gernesIsLoading } = useGetAllGenresQuery();
    const { data: books, isError: booksIsError, isLoading: booksIsLoading } = useGetAllBooksQuery();
    
    if (gernesIsError || booksIsError) return (<ErrorMessage />);
    if (gernesIsLoading || booksIsLoading) return (<Loader />);

    return (
        <>
            <GenresForm genres={genres}/>
            {genres && (genres.length > 0) && books ? (
                <GenresList genres={genres} books={books}/>
            ) : (
                <div>Нет жанров</div>
            )}
        </>
    )
}