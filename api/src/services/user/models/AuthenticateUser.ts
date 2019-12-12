import { IsString, IsEmail } from 'class-validator';
import { IsFacebookAccessToken } from '../../../validators';

class AuthenticateUser {
  @IsString()
  @IsFacebookAccessToken()
  accessToken: string;

  @IsString()
  firstName: string;

  @IsString()
  lastName: string;

  @IsEmail()
  email: string;
}

export default AuthenticateUser;
