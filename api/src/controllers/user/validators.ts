import { object, string } from '@hapi/joi';
import { User } from '../../services/user/types';

export const validateAuthenticateUserRequest = (values: User): boolean => {
  const schema = object<User>({
    accessToken: string().required(),
    firstName: string().required(),
    lastName: string().required(),
    email: string()
      .required()
      .email(),
  });

  const { error } = schema.validate(values);

  return !!error;
};
