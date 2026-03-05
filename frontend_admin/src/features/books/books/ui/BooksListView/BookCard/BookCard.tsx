import { FC } from "react";
import "./BookCard.scss";
import { Book } from "../../../../../../entities/book/model/Book";

interface BookCardProps {
  book: Book;
}

export const BookCard: FC<BookCardProps> = ({book}) => {
    function handleClickOnBtnMore () {

    }

    return (
        <>
            <div className="book-image">
                <img src={`img/books/${book.id}.jpg`} alt="Обложка книги"/>
            </div>
            <div className="book-details">
                <h3 className="book-title">{book.title}</h3>
                {/* <p className="book-author">{book.authorId}</p> */}
                <button onClick={handleClickOnBtnMore} className="details-btn">Подробнее</button>
            </div>        
        </>
    )
}
