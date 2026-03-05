import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { BookList } from '../../../../entities/book/model/Book';

export const booksApi = createApi({
  reducerPath: 'booksApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'api' }),
  endpoints: (builder) => ({
    getAllBooks: builder.query<BookList, void>({
      query: () => '/books',
    }),
  }),
});

export const { useGetAllBooksQuery } = booksApi;
