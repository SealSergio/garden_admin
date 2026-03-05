import { configureStore } from "@reduxjs/toolkit";
import { booksApi } from "../../features/books/books/api/books";
import { authorsApi } from "../../features/books/authors/api/authors.js";
import { genresApi } from "../../features/books/genres/api/genres.js";
import { cyclesApi } from "../../features/books/cycles/api/cycles";

export const store = configureStore({
    reducer: {
        [booksApi.reducerPath]: booksApi.reducer,
        [authorsApi.reducerPath]: authorsApi.reducer,
        [genresApi.reducerPath]: genresApi.reducer,
        [cyclesApi.reducerPath]: cyclesApi.reducer,
    },
    middleware: (getDefaultMiddleware) => 
        getDefaultMiddleware().concat(
            booksApi.middleware,
            authorsApi.middleware,
            genresApi.middleware,
            cyclesApi.middleware
        ),
});
