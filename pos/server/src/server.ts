import "reflect-metadata";

import express from "express";
import { ApolloServer } from "apollo-server-express";
import http from "http";
import schema from "./schema";
const logger = require("./logger").logger("server");

startBackend(5001);

/**
 * Start the backend graphql server on the given port
 * @param {Number} port the port to start on
 */
function startBackend(port: number) {
  const app = express();

  app.use("", express.static("node_modules/wunderbaren-client/public"));

  schema.then(schema => {
    const server = new ApolloServer({
      schema
    });

    server.applyMiddleware({
      app
    });

    const httpServer = http.createServer(app);
    server.installSubscriptionHandlers(httpServer);

    httpServer.listen(port, () => {
      logger.info(
        `Server ready at http://localhost:${port}${server.graphqlPath}`
      );
      logger.info(
        `Subscriptions ready at ws://localhost:${port}${server.subscriptionsPath}`
      );
    });
  });
}
