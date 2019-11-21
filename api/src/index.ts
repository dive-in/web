import 'reflect-metadata';
import * as Koa from 'koa';
import * as logger from 'koa-logger';
import * as json from 'koa-json';
import { createConnection } from 'typeorm';
import { ApolloServer } from 'apollo-server-koa';
import { buildSchema } from 'type-graphql';

(async () => {
  const app = new Koa();;

  await createConnection();

  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: []
    }),
    context: ({ req, res }) => ({ req, res })
  });

  apolloServer.applyMiddleware({ app, cors: false });

  app.listen(4000, () => {
    console.log('koa server started');
  });
})();