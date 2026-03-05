import { Router } from 'express';
import { z } from 'zod';

import { authorizeResponse } from '../auth.js';
import { IAdmin, Admins } from '../database/admins/Admins.js';
import { Passwords } from '../database/admins/Passwords.js';

export const adminsRouter = Router();

const AdminSchema = z.object({
  login: z.string().min(4),
  surname: z.string(),
  name: z.string(),
  accessLevel: z.string(),
  password: z.string().min(8)
});

adminsRouter.post('/register', async (req, res) => {
  const bodyParseResult = AdminSchema.safeParse(req.body);

  if (!bodyParseResult.success) {
    return res.status(400).send(bodyParseResult.error.message);
  }

  const {
    login,
    surname,
    name,
    accessLevel,
    password
  } = bodyParseResult.data;

  let admin: IAdmin;

  try {
    admin = await Admins.create({
      login,
      surname,
      name,
      accessLevel
    });
  } catch (error) {
    return res.status(409).send(`Ошибка: ${error}`);
  }

  await Passwords.create(admin.login, password);

  authorizeResponse(res, admin.login).status(201).json({ login: admin.login });
});
