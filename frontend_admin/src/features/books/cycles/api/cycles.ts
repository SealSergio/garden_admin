import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { CycleList } from '../../../../entities/cycle/model/Cycle';

export const cyclesApi = createApi({
  reducerPath: 'cyclesApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'api' }),
  endpoints: (builder) => ({
    getAllCycles: builder.query<CycleList, void>({
      query: () => '/books/cycles',
    }),
  }),
});

export const { useGetAllCyclesQuery } = cyclesApi;
