import { Entry } from "./db";

export class Item extends Entry {
  constructor(
    public category: string,
    public name: string,
    public url: string,
    public price: number,
    public sold: number
  ) {
    super();
  }
}
