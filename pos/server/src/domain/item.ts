const logger = require("../logger").logger("item");
let db: any;
require("../database")
  .load()
  .then((val: any) => (db = val));
import { Entry } from "./db";
import { ObjectType, Field, Query, Int } from "type-graphql";
import { Stock } from "./stock";

@ObjectType()
export class Item extends Entry {
  @Field(() => String)
  category: string;
  @Field(() => String)
  name: string;
  @Field(() => String)
  image: string;
  @Field(() => Int)
  price: number;
  constructor(category: string, name: string, url: string, price: number) {
    super();
    this.category = category;
    this.name = name;
    this.image = url;
    this.price = price;
  }
}

export class ItemResolver {
  @Query(() => [Item])
  getItems() {
    logger.debug("getItems()");
    return Object.keys(db.stock as Stock)
      .filter(
        //Filter out db functions
        key =>
          db.stock[key] &&
          {}.toString.call(db.stock[key]) !== "[object Function]"
      )
      .map(key =>
        db.stock[key].map((item: Item) => ({ ...item, category: key }))
      )
      .reduce((acc, val) => acc.concat(val), []);
  }
}
