import { IsString, IsEmail } from 'class-validator';

class AuthenticateUser {
  @IsString()
  accessToken: string;

  @IsString()
  firstName: string;

  @IsString()
  lastName: string;

  @IsEmail()
  email: string;
}

export default AuthenticateUser;
