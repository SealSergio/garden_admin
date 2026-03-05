import { ErrorMessage } from "../../../../../shared/components/Error/Error";
import { Loader } from "../../../../../shared/components/Loader/Loader";
import { useGetAllAuthorsQuery } from "../../../authors/api/authors";
import { useGetAllBooksQuery } from "../../api/books";
import { useGetAllCyclesQuery } from "../../../cycles/api/cycles";
import { useGetAllGenresQuery } from "../../../genres/api/genres";
import { BookForm } from "../BookForm/BookForm";
import { BookListView } from "../BooksListView/BookListView";
import { Filters } from "../BooksListView/Filters/Filters";

export const BooksMain: React.FC = () => {
    const { data: booksData, isError: booksIsError, isLoading: booksIsLoading } = useGetAllBooksQuery();
    const { data: authorsData, isError: authorsIsError, isLoading: authorsIsLoading } = useGetAllAuthorsQuery();
    const { data: genresData, isError: genresIsError, isLoading: genresIsLoading } = useGetAllGenresQuery();
    const { data: cyclesData, isError: cyclesIsError, isLoading: cyclesIsLoading } = useGetAllCyclesQuery();

    if (booksIsLoading || authorsIsLoading || genresIsLoading || cyclesIsLoading) {
        return (<Loader />);
    }

    if (booksIsError || authorsIsError || genresIsError || cyclesIsError) {
        return (<ErrorMessage />);
    }

    if (booksData && authorsData && genresData && cyclesData) {
        return (
            <>
                <BookForm
                    books={booksData}
                    genres={genresData}
                    authors={authorsData}
                    cycles={cyclesData}
                />
                <div className="section-books">
                    <Filters genres={genresData} authors={authorsData}/>
                    {booksData.length > 0 ? (
                        <BookListView bookList={booksData}/>
                    ) : (
                        <div>Нет книг</div>
                    )}
                </div>
            </>
        )
    }
}
