import { verify } from 'jsonwebtoken';
import { AuthorizationChecker } from 'routing-controllers/AuthorizationChecker';
import NotAuthenticatedError from '../errors/NotAuthenticatedError';

const checkAuthorization: AuthorizationChecker = (action): boolean => {
  const { authorization } = action.request.headers;
  if (!authorization) {
    throw new NotAuthenticatedError();
  }

  try {
    const token = authorization.split(' ')[1];

    verify(token, process.env.PRIVATE_KEY);
  } catch (err) {
    throw new NotAuthenticatedError();
  }

  return true;
};

export default checkAuthorization;
