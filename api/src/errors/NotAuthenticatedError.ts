import BaseHttpError from './BaseHttpError';

class NotAuthenticatedError extends BaseHttpError {
  constructor() {
    super(403, 'User not authenticated');

    this.name = NotAuthenticatedError.name;
  }
}

export default NotAuthenticatedError;
