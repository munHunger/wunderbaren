const logger = require("../logger").logger("card");
let db: any;
require("../database")
  .load()
  .then((val: any) => (db = val));
import { Entry } from "./db";
import {
  ObjectType,
  Field,
  Query,
  Mutation,
  InputType,
  Arg,
  PubSub,
  Publisher,
  Subscription,
  Root,
  Int
} from "type-graphql";
import { subscriptionTopics } from "../subscriptions";

export var lastScanned: Card;

@ObjectType()
@InputType("CardInput")
export class Card extends Entry {
  @Field(() => String)
  code: string;
  @Field(() => String, { nullable: true })
  scannedDate: string;
  @Field(() => Int, { nullable: true })
  amount: number;
  constructor(code: string, scannedDate: string, amount: number) {
    super();
    this.code = code;
    this.scannedDate = scannedDate;
    this.amount = amount;
  }

  static getDate() {
    return (
      ("0" + new Date().getHours()).slice(-2) +
      ":" +
      ("0" + new Date().getMinutes()).slice(-2)
    );
  }
}

export class CardResolver {
  @Query(() => Card)
  getCard(): Card {
    logger.debug(`Fetching latest scanned card`, { data: lastScanned });
    return lastScanned;
  }

  @Mutation(() => Card)
  scanCard(
    @Arg("card") card: string,
    @PubSub(subscriptionTopics.scannedCard) publish: Publisher<Card>
  ): Card {
    if (!db.cards[card]) {
      logger.info(`Registering new card ${card}`);
      db.cards.register(card, new Card(card, Card.getDate(), 0));
    } else {
      db.cards[card].scannedDate = Card.getDate();
      db.cards[card].save();
      logger.info(`Scanned old card ${card}`);
    }
    lastScanned = db.cards[card];
    publish(lastScanned);
    return lastScanned;
  }

  @Mutation(() => Card)
  fillCard(
    @Arg("card") cardInput: string,
    @Arg("amount", () => Int) amount: number
  ): Card {
    let card = (lastScanned || db.cards[cardInput]) as Card;
    logger.info(`Filling card ${card.code || cardInput} with ${amount}`);
    if (!card) {
      logger.error(`Card was not registered`);
      throw new Error("Cannot fill unregistered card");
    } else {
      card.amount += amount;
      card.save();
    }
    return card;
  }

  @Subscription({
    topics: subscriptionTopics.scannedCard
  })
  scannedCard(@Root() card: Card): Card {
    return card;
  }
}
