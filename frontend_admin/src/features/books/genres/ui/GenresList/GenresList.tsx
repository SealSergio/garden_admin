import { DeletionIcon, EditingIcon } from "../../../../../shared/components/Icons/Icons";
import { BookList } from "../../../../../entities/book/model/Book";
import { GenreList } from "../../../../../entities/genre/model/Genre";
import "../../../../../shared/styles/table.scss";

interface GenresListProps {
    genres: GenreList,
    books: BookList,
}

export const GenresList: React.FC<GenresListProps> = ({ genres, books }) => {
    return (
        <div className="table-wrapper">
            <table className="table">
                <thead>
                    <tr>
                        <th>Жанр</th>
                        <th>Сколько книг</th>
                        <th>Изменить</th>
                        <th>Удалить</th>
                    </tr>
                </thead>
                <tbody>
                    {genres.map((genre) => 
                        <tr key={genre.genreTitle}>
                            <td>{genre.genreTitle}</td>
                            <td>{(books.filter((book) => book.genres.some((currentBookGenre) =>
                                currentBookGenre.genreTitle === genre.genreTitle))).length}
                            </td>
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