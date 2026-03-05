import express from 'express';
import { booksRouter } from './books.js';
import { authorsRouter } from './authors.js';
import { cyclesRouter } from './cycles.js';
import { genresRouter } from './genres.js';

export const booksParentRouter = express.Router();

booksParentRouter.use('/', booksRouter);
booksParentRouter.use('/authors', authorsRouter);
booksParentRouter.use('/cycles', cyclesRouter);
booksParentRouter.use('/genres', genresRouter);

