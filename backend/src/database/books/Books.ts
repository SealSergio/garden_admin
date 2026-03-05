import { JSONFilePreset } from "lowdb/node";
import { Book } from "../../routes/books/books.js";
import { writeFile } from 'fs/promises';

const database = await JSONFilePreset<Record<string, Book>>("./src/data/books/books.json", {});

export interface IGetAllBooksOptions {
  page?: number;
  pageSize?: number;
  searchString?: string;
}
export interface IGetAllBooksResult {
  list: Book[];
  pageCount: number;
}

export class Books {
  static getAllForAdmin(
    { page, pageSize, searchString }: IGetAllBooksOptions = {},
  ): Book[] {

    return Object.values(database.data);
  }

  static async create(Book: Book): Promise<Book[]> {
    await database.update((data) => {
      data[Book.id] = Book;
    });

    const jsonData = JSON.stringify(Object.values(database.data), null, 2);
    await writeFile("./src/data/books/books.json", jsonData, 'utf-8');

    return Object.values(database.data);
  }
}
