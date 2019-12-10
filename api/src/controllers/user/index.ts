import * as Router from '@koa/router';
import { object, string } from '@hapi/joi';
import Container from 'typedi';
import ResponseBody from '../../types/ResponseBody';
import { Dependencies, UserControllerMiddleware } from './types';
import { User as IUser } from '../../services/user/types';
import UserService from '../../services/user';
import validationMiddleware from '../../middleware/validation';
import verifyTokenMiddleware from '../../middleware/jwt';

const userController = new Router<{}, Dependencies>();

const injectDependencies = (): UserControllerMiddleware => async (
  ctx,
  next
): Promise<void> => {
  ctx.userService = Container.get(UserService);

  await next();
};

userController.use(injectDependencies());

/**
 * @api {post} /users/authenticate Authenticate user with Facebook accessToken
 * @apiName authenticateUser
 * @apiGroup Users
 *
 * @apiParam {String} accessToken The Facebook access token.
 * @apiParam {String} firstName The first name of the user, retrieved from the Facebook metadata.
 * @apiParam {String} lastName The last name of the user, retrieved from the Facebook metadata.
 * @apiParam {String} email The e-mail address of the user, retrieved from the Facebook metadata.
 *
 * @apiSuccess {Number} status The 2XX status message.
 * @apiSuccess {String} message The JWT token to be used for authentication.
 *
 * @apiError {Number} status The status code of the error. <code>400</code> means the body parameters were invalid. <code>500</code> means the database operation failed.
 * @apiError {String} message The message explaining more precisely what happened.
 */
const authenticateUser: UserControllerMiddleware = async ctx => {
  const body = ctx.request.body as IUser;

  const { userService } = ctx;

  try {
    const newUser = await userService.saveOrUpdate(body);

    const token = userService.generateToken(newUser.id, body.accessToken);

    ctx.status = 200;

    const response: ResponseBody<string> = {
      status: 200,
      payload: token,
    };

    ctx.body = response;
  } catch (e) {
    ctx.status = 500;

    const response: ResponseBody<string> = {
      status: 500,
      payload: 'An error occurred. Please try again.',
    };

    ctx.body = response;
  }
};

const authenticateUserSchema = object<IUser>({
  accessToken: string().required(),
  firstName: string().required(),
  lastName: string().required(),
  email: string()
    .required()
    .email(),
});

userController.post(
  '/authenticate',
  validationMiddleware(authenticateUserSchema),
  authenticateUser
);

userController.use(verifyTokenMiddleware);

export default userController;
