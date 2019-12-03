import 'reflect-metadata';
import * as Koa from 'koa';
import * as Router from '@koa/router';
import * as logger from 'koa-logger';
import * as bodyParser from 'koa-bodyparser';
import * as json from 'koa-json';
import { ApolloServer } from 'apollo-server-koa';
import { buildSchema } from 'type-graphql';
import * as mount from 'koa-mount';
import * as serve from 'koa-static';
import { resolve } from 'path';
import createDatabaseConnection from './config/database';
import userController from './controllers/user';
import { HelloWorldResolver } from './resolvers/HelloWorldResolver';
import restaurantController from './controllers/restaurant';

const app = new Koa();

app.use(logger());
app.use(json());
app.use(bodyParser());

const router = new Router();

router.use('/users', userController.routes(), userController.allowedMethods());
router.use(
  '/restaurants',
  restaurantController.routes(),
  restaurantController.allowedMethods()
);

app.use(mount('/api', router.routes()));

app.use(serve(resolve(__dirname, './docs')));

const port = process.env.PORT ?? 8080;

app.listen(port, async () => {
  await createDatabaseConnection();
  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [HelloWorldResolver],
    }),
    context: ({ req, res }) => ({ req, res }),
  });
  apolloServer.applyMiddleware({ app: app as any, cors: false });
  // TODO: replace with actual logger
  console.log(`Server running at port ${port}`);
});
