import { JSONFilePreset } from "lowdb/node";

const database = await JSONFilePreset<string[]>("./src/data/books/genres.json", []);

export class Genres {
  static getAllForAdmin(): string[] {
    return Object.values(database.data);
  }
}
