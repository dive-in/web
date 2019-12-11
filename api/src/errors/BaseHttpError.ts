import { HttpError } from 'routing-controllers';

import ResponseBody from '../types/ResponseBody';

class BaseHttpError extends HttpError {
  constructor(status: number, message?: string) {
    super(status, message);
    Object.setPrototypeOf(this, BaseHttpError.prototype);
  }

  toJSON(): ResponseBody<string> {
    return {
      status: this.httpCode,
      payload: this.message,
    };
  }
}

export default BaseHttpError;
