import * as Router from '@koa/router';
import { getManager } from 'typeorm';
import User from '../../entities/User';
import ResponseBody from '../../types/ResponseBody';
import { Dependencies, UserControllerMiddleware } from './types';
import { validateAuthenticateUserRequest } from './validators';
import { User as IUser } from '../../services/user/types';
import UserService from '../../services/user';

const userController = new Router<{}, Dependencies>();

const injectDependencies = (): Router.Middleware<{}, Dependencies> => async (
  ctx,
  next
): Promise<void> => {
  const userRepository = getManager().getRepository(User);

  ctx.userService = UserService.getInstance(userRepository);

  await next();
};

userController.use(injectDependencies());

const authenticateUser: UserControllerMiddleware = async ctx => {
  const body = ctx.request.body as IUser;

  const { userService } = ctx;

  const hasErrors = validateAuthenticateUserRequest(body);

  if (hasErrors) {
    ctx.status = 400;

    const response: ResponseBody<string> = {
      status: 400,
      message: 'Invalid request body',
    };

    ctx.body = response;

    return;
  }

  try {
    const newUser = await userService.saveOrUpdate(body);

    const token = userService.generateToken(newUser.id, body.accessToken);

    ctx.status = 200;

    const response: ResponseBody<string> = {
      status: 200,
      message: token,
    };

    ctx.body = response;
  } catch (e) {
    ctx.status = 500;

    const response: ResponseBody<string> = {
      status: 500,
      message: 'An error occurred. Please try again.',
    };

    ctx.body = response;
  }
};

userController.post('/authenticate', authenticateUser);

export default userController;
