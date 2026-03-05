import { ErrorMessage } from "../../../../../shared/components/Error/Error";
import { Loader } from "../../../../../shared/components/Loader/Loader";
import { useGetAllAuthorsQuery } from "../../api/authors";
import { useGetAllBooksQuery } from "../../../books/api/books"; 
import { AuthorListView } from "../AuthorListView/AuthorListView"
import { AuthorForm } from "../AuthorForm/AuthorForm";


export const AuthorsMain: React.FC = () => {
    const { data: authors, isError, isLoading } = useGetAllAuthorsQuery();
    const { data: books, isError: booksIsError, isLoading: booksIsLoading } = useGetAllBooksQuery();

    if (booksIsError || isError) return (<ErrorMessage />);
    if (booksIsLoading || isLoading) return (<Loader />);

    return (
        <>
            <AuthorForm authors={authors}/>
            {authors && books ? (
                <AuthorListView authors={authors} books={books}/>
            ) : (
                <div>Нет авторов</div>
            )}
        </>
    )
}
