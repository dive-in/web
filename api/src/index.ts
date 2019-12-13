import 'reflect-metadata';
import * as logger from 'koa-logger';
import * as bodyParser from 'koa-bodyparser';
import * as json from 'koa-json';
import { useContainer, createKoaServer } from 'routing-controllers';
import { ApolloServer } from 'apollo-server-koa';
import { buildSchema } from 'type-graphql';
import * as serve from 'koa-static';
import { resolve } from 'path';
import Container from 'typedi';
import createDatabaseConnection from './config/database';
import UserController from './controllers/user';
import RestaurantController from './controllers/restaurant';
import checkAuthorization from './utils/authorization';

import './errors/override';

useContainer(Container);

const app = createKoaServer({
  authorizationChecker: checkAuthorization,
  routePrefix: 'api',
  controllers: [UserController, RestaurantController],
  validation: {
    validationError: {
      target: false,
    },
  },
});

app.use(logger());
app.use(json());
app.use(bodyParser());

app.use(serve(resolve(__dirname, './docs')));

const port = process.env.PORT ?? 8080;

app.listen(port, async () => {
  await createDatabaseConnection();
  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [],
    }),
    context: ({ req, res }) => ({ req, res }),
  });
  apolloServer.applyMiddleware({ app: app as any, cors: false });
  // TODO: replace with actual logger
  console.log(`Server running at port ${port}`);
});
