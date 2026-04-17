import { configureStore } from "@reduxjs/toolkit";
import { productsApi } from "../../../../api/products.js";
import productFormReducer from '../../features/productForm/model/productFormSlice.js';

export const store = configureStore({
    reducer: {
        [productsApi.reducerPath]: productsApi.reducer,
        productForm: productFormReducer,
    },
    middleware: (getDefaultMiddleware) => 
        getDefaultMiddleware().concat(
            productsApi.middleware
        ),
});

export type RootState = ReturnType<typeof store.getState>;
