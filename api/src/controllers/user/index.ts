import { object, string } from '@hapi/joi';
import { Post, Body, JsonController, UseBefore } from 'routing-controllers';
import ResponseBody from '../../types/ResponseBody';
import { User as IUser } from '../../services/user/types';
import UserService from '../../services/user';
import validationMiddleware from '../../middleware/validation';

const authenticateUserSchema = object<IUser>({
  accessToken: string().required(),
  firstName: string().required(),
  lastName: string().required(),
  email: string()
    .required()
    .email(),
});

@JsonController('/users')
class UserController {
  constructor(private userService: UserService) {}

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
  @Post('/authenticate')
  @UseBefore(validationMiddleware(authenticateUserSchema))
  async authenticate(
    @Body({ required: true }) user: IUser
  ): Promise<ResponseBody<string>> {
    try {
      const newUser = await this.userService.saveOrUpdate(user);

      const token = this.userService.generateToken(
        newUser.id,
        user.accessToken
      );

      const response: ResponseBody<string> = {
        status: 200,
        payload: token,
      };

      return response;
    } catch (e) {
      return {
        status: 500,
        payload: 'An error occurred. Please try again.',
      };
    }
  }
}

export default UserController;
