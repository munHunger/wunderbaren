const logger = require("../logger").logger("resolver");
let db: any;
require("../database")
  .load()
  .then((val: any) => (db = val));
import { IResolvers } from "graphql-tools";
import { Stock } from "../domain/stock";
import { Card } from "../domain/card";
import { pubsub, subscriptionTopics } from "../subscriptions";
import { Item } from "src/domain/item";

var lastScanned: Card;

const resolverMap: IResolvers = {
  Query: {
    getItems(): Item {
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
    },
    getCard(): Card {
      logger.debug(`Fetching latest scanned card`, { data: lastScanned });
      return lastScanned;
    }
  },
  Mutation: {
    scanCard(_: void, input: any): Card {
      if (!db.cards[input.card]) {
        logger.info(`Registering new card ${input.card}`);
        db.cards.register(input.card, new Card(input.card, Card.getDate(), 0));
      } else {
        db.cards[input.card].scannedDate = Card.getDate();
        db.cards[input.card].save();
        logger.info(`Scanned old card ${input.card}`);
      }
      lastScanned = db.cards[input.card];
      pubsub.publish(subscriptionTopics.scannedCard, {
        scannedCard: lastScanned
      });
      return lastScanned;
    },
    fillCard(_: void, input: any): Card {
      logger.info(`Filling card ${input.card} with ${input.amount}`);
      let card = (lastScanned || db.cards[input.card]) as Card;
      if (!card) {
        logger.error(`Card was not registered`);
        throw new Error("Cannot fill unregistered card");
      } else {
        card.amount += input.amount;
        card.save();
      }
      return card;
    }
  },
  Subscription: {
    scannedCard: {
      subscribe(): AsyncIterator<String, Card, Card> {
        logger.info("subscribed to scanned card");
        return pubsub.asyncIterator(subscriptionTopics.scannedCard);
      }
    }
  }
};
export default resolverMap;
