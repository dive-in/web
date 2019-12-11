import { BadRequestError, HttpError } from 'routing-controllers';

import BaseHttpError from './BaseHttpError';

import ErrorResponseBody from '../types/ErrorResponseBody';

HttpError.prototype.toJSON = BaseHttpError.prototype.toJSON;

BadRequestError.prototype.toJSON = function toJSON(): ErrorResponseBody<
  string
> {
  return {
    status: this.httpCode,
    payload: this.message,
    errors: this.errors,
  };
};
