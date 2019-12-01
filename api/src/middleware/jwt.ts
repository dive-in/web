import { Middleware } from 'koa';
import { verify } from 'jsonwebtoken';
import ResponseBody from '../types/ResponseBody';

const verifyTokenMiddleware: Middleware = async (ctx, next) => {
  const {
    header: { authorization },
  } = ctx;
  try {
    verify(authorization.split(' ')[1], process.env.PRIVATE_KEY);
    await next();
  } catch (err) {
    ctx.status = 403;

    const response: ResponseBody<string> = {
      status: 403,
      message: 'User not authenticated',
    };

    ctx.body = response;
  }
};

export default verifyTokenMiddleware;
