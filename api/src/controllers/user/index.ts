import {
  Post,
  Body,
  JsonController,
  InternalServerError,
} from 'routing-controllers';
import ResponseBody from '../../types/ResponseBody';
import UserService from '../../services/user';
import AuthenticateUser from '../../services/user/models/AuthenticateUser';

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
   * @apiError (Error 400) {BadRequestError} name The request body is invalid.
   * @apiError (Error 400) {String} message A descriptive message of the error.
   * @apiError (Error 400) {Object[]} errors An array of error objects indicating the validation errors for each field.
   *
   * @apiError (Error 500) {InternalServerError} name An internal error occurred, probably during database connection.
   * @apiError (Error 500) {String} message The message explaining more precisely what happened.
   */
  @Post('/authenticate')
  async authenticate(
    @Body({ required: true, validate: true }) user: AuthenticateUser
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
      throw new InternalServerError('An error occured. Please try again');
    }
  }
}

export default UserController;
