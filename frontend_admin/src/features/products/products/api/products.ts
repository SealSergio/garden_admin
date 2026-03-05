import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { ProductList } from '../../../../entities/product/model/Product';

export const productsApi = createApi({
  reducerPath: 'productsApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'api' }),
  endpoints: (builder) => ({
    getAllProducts: builder.query<ProductList, void>({
      query: () => '/products',
    }),
  }),
});

export const { useGetAllProductsQuery } = productsApi;
