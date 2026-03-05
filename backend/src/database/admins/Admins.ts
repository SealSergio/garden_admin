import { randomUUID } from 'crypto';
import { JSONFilePreset } from 'lowdb/node';

export interface IAdmin {
  login: string;
  surname?: string;
  name?: string;
  accessLevel?: string;
  password?: string;
}

export const database = await JSONFilePreset<Record<string, IAdmin>>(
  './src/data/admins/admins.json',
  {}
);

export class Admins {
  static getOne(login: string): IAdmin | undefined {
    return database.data[login];
  }

  static getAll(): IAdmin[] {
    return Object.values(database.data);
  }

  static findOne(predicate: (admins: IAdmin) => boolean): IAdmin | undefined {
    return Admins.getAll().find(predicate);
  }

  static async create({
      login,
      surname,
      name,
      accessLevel
    }: IAdmin): Promise<IAdmin> {
    if (Admins.findOne((admin) => admin.login === login)) {
      throw new Error('Login already in use');
    }

    const admin: IAdmin = {
      login,
      surname,
      name,
      accessLevel
    };

    await database.update((data) => {
      data[admin.login] = admin;
    });

    await database.write();

    return admin;
  }
}
