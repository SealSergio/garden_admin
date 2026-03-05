import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { GenreList } from '../../../../entities/genre/model/Genre';

export const genresApi = createApi({
  reducerPath: 'genresApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'api' }),
  endpoints: (builder) => ({
    getAllGenres: builder.query<GenreList, void>({
      query: () => '/books/genres',
    }),
  }),
});

export const { useGetAllGenresQuery } = genresApi;
