import * as Koa from 'koa';
import * as logger from 'koa-logger';
import * as json from 'koa-json';

const app = new Koa();

app.use(logger());
app.use(json());

const port = process.env.PORT ?? 8080;

app.listen(port, () => {
  // TODO: replace with actual logger
  console.log(`Server running at port ${port}`);
});
