import BaseHttpError from './BaseHttpError';

class NotFoundError extends BaseHttpError {
  constructor() {
    super(404, 'Resource not found');

    this.name = NotFoundError.name;
  }
}

export default NotFoundError;
