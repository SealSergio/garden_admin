import express, { json } from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';

import {
  authRouter,
  adminsRouter,
  booksRouter
}  from './routes/index.js';

const server = express();

server.listen(4000, () => {
  console.log('Server started on port 4000');
});

server.use(json(), cookieParser(), cors());

server.use('/auth', authRouter);
server.use('/admins', adminsRouter);
server.use('/books', booksRouter);
