import * as Koa from 'koa';
import * as Router from '@koa/router';
import * as logger from 'koa-logger';
import * as bodyParser from 'koa-bodyparser';
import * as json from 'koa-json';
import * as mount from 'koa-mount';
import * as serve from 'koa-static';
import { resolve } from 'path';
import createDatabaseConnection from './config/database';
import userController from './controllers/user';

const app = new Koa();

app.use(logger());
app.use(json());
app.use(bodyParser());

const router = new Router();

router.use('/users', userController.routes(), userController.allowedMethods());

app.use(mount('/api', router.routes()));

app.use(serve(resolve(__dirname, './docs')));

const port = process.env.PORT ?? 8080;

app.listen(port, async () => {
  await createDatabaseConnection();
  // TODO: replace with actual logger
  console.log(`Server running at port ${port}`);
});
