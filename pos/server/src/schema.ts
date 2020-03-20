import "graphql-import-node";
import { buildSchema } from "type-graphql";
import { CardResolver } from "./domain/card";
import { ItemResolver } from "./domain/item";
import { TransactionResolver } from "./domain/transaction";

const schema = buildSchema({
  resolvers: [CardResolver, ItemResolver, TransactionResolver]
});
export default schema;
