import { PubSub } from "apollo-server-express";

export const pubsub = new PubSub();

export const subscriptionTopics = {
  scannedCard: "scannedCard",
  transaction: "transaction"
};
