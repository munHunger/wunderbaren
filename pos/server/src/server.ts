import express from "express";
import { ApolloServer } from "apollo-server-express";
import http from "http";
import schema from "./schema";
const logger = require("./logger").logger("server");

// startFrontend(5002);
startBackend(5001);

/**
 * Start the frontend server on the given port
 * @param {Number} port the port to start on
 */
function startFrontend(port: number) {
  const app = express();
  const rootPath = `${__dirname}/../../client/public`;
  logger.debug(`serving static content from ${rootPath}`);
  app.use(express.static(rootPath));
  app.listen(port, () =>
    logger.info(`Frontend is up and ready at http://localhost:${port}`)
  );
}

/**
 * Start the backend graphql server on the given port
 * @param {Number} port the port to start on
 */
function startBackend(port: number) {
  const app = express();

  app.use("", express.static("node_modules/wunderbaren-client/public"));

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
}
