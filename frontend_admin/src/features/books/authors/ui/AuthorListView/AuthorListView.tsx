import { DeletionIcon, EditingIcon } from "../../../../../shared/components/Icons/Icons";
import { BookList } from "../../../../../entities/book/model/Book";
import { AuthorList } from "../../../../../entities/author/model/Author";
import "../../../../../shared/styles/table.scss";

interface AuthorListProps {
    authors: AuthorList,
    books: BookList
}

export const AuthorListView: React.FC<AuthorListProps> = ({ authors, books }) => {
        return (
            <div className="table-wrapper">
                <table className="table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Полное имя</th>
                            <th>Сколько книг</th>
                            <th>Изменить</th>
                            <th>Удалить</th>
                        </tr>
                    </thead>
                    <tbody>
                        {authors.map((author) => 
                            <tr key={author.id}>
                                <td>{author.id}</td>
                                <td>{author.fullname}</td>
                                <td>{(books.filter((book) => book.authorId === author.id)).length}</td>
                                <td>
                                    <EditingIcon />
                                </td>
                                <td>
                                    <DeletionIcon />
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        )
}
