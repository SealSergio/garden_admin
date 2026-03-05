import { JSONFilePreset } from 'lowdb/node';
import { pbkdf2Sync } from 'node:crypto';

const database = await JSONFilePreset<Record<string, string>>(
  './src/data/admins/passwords.json',
  {}
);

export class Passwords {
  static getOne(login: string): string | undefined {
    return database.data[login];
  }

  static async create(login: string, password: string): Promise<void> {
    await database.update((data) => {
      data[login] = Passwords._hashPassword(password);
    });
  }

  static verify(login: string, password: string): boolean {
    return Passwords.getOne(login) === Passwords._hashPassword(password);
  }

  private static _hashPassword(password: string): string {
    return pbkdf2Sync(password, 'salt', 1000, 64, 'sha512').toString(`hex`);
  }
}
