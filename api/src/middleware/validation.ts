import { ObjectSchema } from '@hapi/joi';
import { Middleware } from '@koa/router';
import ResponseBody from '../types/ResponseBody';

const validationMiddleware = <T>(
  validationSchema: ObjectSchema<T>
): Middleware => async (ctx, next): Promise<void> => {
  const body = ctx.body as T;

  const { error } = validationSchema.validate(body);

  if (!error) {
    await next();
    return;
  }

  ctx.status = 400;

  const response: ResponseBody<string> = {
    status: 400,
    message: 'Invalid request body',
  };

  ctx.body = response;
};

export default validationMiddleware;
