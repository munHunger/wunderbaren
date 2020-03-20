const logger = require("../logger").logger("transaction");
let db: any;
require("../database")
  .load()
  .then((val: any) => (db = val));
import { Entry } from "./db";
import {
  ObjectType,
  Field,
  Query,
  Int,
  InputType,
  Mutation,
  Arg,
  PubSub,
  Publisher,
  Subscription,
  Root
} from "type-graphql";
import { Stock } from "./stock";
import { Card, lastScanned } from "./card";
import { Item } from "./item";
import { subscriptionTopics } from "../subscriptions";

@ObjectType()
export class Transaction {
  @Field(() => Card)
  card: Card;
  @Field(() => String)
  placedDate: string;
  @Field(() => [Order])
  items: Order[];
}

@ObjectType()
@InputType("OrderInput")
export class Order {
  @Field(() => String)
  category: string;
  @Field(() => String)
  name: string;
  @Field(() => Int)
  amount: number;
}

export class TransactionResolver {
  @Mutation(() => String)
  purchase(
    @Arg("card", () => String) cardCode: string,
    @Arg("items", () => [Order]) order: Order[],
    @PubSub(subscriptionTopics.transaction) publish: Publisher<Transaction>
  ): string {
    let card = (lastScanned || db.cards[cardCode]) as Card;
    logger.info(`Making a purchase with card ${card.code}`);
    let items = order.map((item: any) => ({
      ...db.stock[item.category].find((stock: any) => stock.name === item.name),
      amount: item.amount
    }));
    let amount = items.reduce(
      (acc: number, val: any) => (acc += val.price * val.amount),
      0
    );
    if (card.amount >= amount) {
      logger.info(`Card funded OK for amount ${amount}`);
      card.amount -= amount;
      card.save();

      publish({
        card,
        placedDate:
          ("0" + new Date().getHours()).slice(-2) +
          ":" +
          ("0" + new Date().getMinutes()).slice(-2),
        items
      });
      return "OK";
    } else {
      logger.info(`Card is not funded for amount ${amount}`);
      return "Not enough funds";
    }
  }

  @Subscription({
    topics: subscriptionTopics.transaction
  })
  transaction(@Root() transaction: Transaction): Transaction {
    return transaction;
  }
}
