import { Router } from 'express';
import { z } from 'zod';

import { authorizeResponse, unauthorizeResponse, authorizeRequest } from '../auth.js';
import { Admins } from '../database/admins/Admins.js';
import { Passwords } from '../database/admins/Passwords.js';

export const authRouter = Router();

const AuthSchema = z.object({
  login: z.string().min(4),
  password: z.string().min(8),
});

authRouter.post('/login', (req, res) => {
  const bodyParseResult = AuthSchema.safeParse(req.body);

  if (!bodyParseResult.success) {
    return res.status(400).send(bodyParseResult.error.message);
  }

  const { login, password } = bodyParseResult.data;

  const admin = Admins.findOne((admin) => admin.login === login);

  if (!admin || !Passwords.verify(admin.login, password)) {
    return res.status(401).send('Неверное имя пользователя или пароль');
  }

  authorizeResponse(res, admin.login).status(200).send();
});

authRouter.post('/logout', (req, res) => {
  unauthorizeResponse(res).status(200).send();
});

authRouter.get('/me', (req, res) => {
  const adminId = authorizeRequest(req);

  if (!adminId) {
    return res.status(401).send('Unauthorized');
  }

  const admin = Admins.getOne(adminId);

  if (!admin) {
    return res.status(404).send('Пользователь не найден');
  }

  res.status(200).json(admin);
});