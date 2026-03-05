import { JSONFilePreset } from "lowdb/node";

export interface IAuthor {
  id: string,
  author: string,
}

const database = await JSONFilePreset<Record<string, IAuthor>>("./src/data/products/products.json", {});

export class Products {
  static getAllForAdmin(): IAuthor[] {
    return Object.values(database.data);
  }
}
