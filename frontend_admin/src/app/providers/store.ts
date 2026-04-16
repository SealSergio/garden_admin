import { configureStore } from "@reduxjs/toolkit";
import { productsApi } from "../../features/products/api/products.js";

export const store = configureStore({
    reducer: {
        [productsApi.reducerPath]: productsApi.reducer
    },
    middleware: (getDefaultMiddleware) => 
        getDefaultMiddleware().concat(
            productsApi.middleware
        ),
});
