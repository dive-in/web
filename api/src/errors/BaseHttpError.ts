import { HttpError } from 'routing-controllers';
import ResponseBody from '../types/ResponseBody';

class BaseHttpError extends HttpError {
  // Note: Doesn't work for some reason, even though it's listed in the docs. Will have to check with the routing-controllers repo
  // For now we'll go with the default response body
  toJSON(): ResponseBody<string> {
    return {
      status: this.httpCode,
      payload: this.message,
    };
  }
}

export default BaseHttpError;
