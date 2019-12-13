import BaseHttpError from './BaseHttpError';
import ResponseBody from '../types/ResponseBody';

class InvalidBodyError extends BaseHttpError {
  constructor() {
    super(400, 'Invalid request body');

    this.name = InvalidBodyError.name;
  }
}

export default InvalidBodyError;
