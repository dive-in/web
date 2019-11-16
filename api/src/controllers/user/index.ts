import * as Router from 'koa-router';
import { getManager } from 'typeorm';
import User from '../../entities/User';
import ResponseBody from '../../types/ResponseBody';
import {
  Dependencies,
  UserControllerMiddleware,
  AuthenticateUserRequest,
} from './types';

const userController = new Router<{}, Dependencies>();

const injectDependencies = (): Router.IMiddleware<{}, Dependencies> => async (
  ctx,
  next
): Promise<void> => {
  ctx.userRepository = getManager().getRepository(User);

  await next();
};

userController.use(injectDependencies());

const authenticateUser: UserControllerMiddleware = ctx => {
  const { accessToken } = ctx.body as AuthenticateUserRequest;

  // const { userRepository } = ctx;

  // TODO: Validate entire body
  if (!accessToken) {
    ctx.status = 400;

    const response: ResponseBody<string> = {
      status: 400,
      message: 'Required parameter `accessToken` is missing.',
    };

    ctx.body = response;

    ctx.res.end();
  }

  // TODO: Handle logic of adding user if not present and generating JWT and refresh token
};

userController.post('/authenticate', authenticateUser);

export default userController;
