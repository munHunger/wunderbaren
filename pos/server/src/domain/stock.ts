import { Item } from "./item";
import { Table } from "./db";

export class Stock extends Table {
  constructor(public drink: [Item], public beer: [Item]) {
    super();
  }
}
