import { JSONFilePreset } from "lowdb/node";

export interface ICycle {
  cycleId: string;
  authorId: string;
  booksInCycle: string[];
}

const database = await JSONFilePreset<Record<string, ICycle>>("./src/data/books/cycles.json", {});

export class Cycles {
  static getAllForAdmin(): ICycle[] {
    return Object.values(database.data);
  }
}
