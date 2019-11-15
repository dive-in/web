import * as Koa from 'koa';
import * as logger from 'koa-logger';
import * as json from 'koa-json';
import createDatabaseConnection from './config/database';

const app = new Koa();

app.use(logger());
app.use(json());

const port = process.env.PORT ?? 8080;

app.listen(port, async () => {
  await createDatabaseConnection();
  // TODO: replace with actual logger
  console.log(`Server running at port ${port}`);
});
