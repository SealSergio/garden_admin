import { configureStore } from "@reduxjs/toolkit";
import { productsApi } from "../../features/products/products/api/products";

export const store = configureStore({
    reducer: {
        [productsApi.reducerPath]: productsApi.reducer
    },
    middleware: (getDefaultMiddleware) => 
        getDefaultMiddleware().concat(
            productsApi.middleware
        ),
});
