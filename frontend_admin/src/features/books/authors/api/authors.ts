import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { AuthorList } from '../../../../entities/author/model/Author';

export const authorsApi = createApi({
  reducerPath: 'authorsApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'api' }),
  endpoints: (builder) => ({
    getAllAuthors: builder.query<AuthorList, void>({
      query: () => '/books/authors',
    }),
  }),
});

export const { useGetAllAuthorsQuery } = authorsApi;
