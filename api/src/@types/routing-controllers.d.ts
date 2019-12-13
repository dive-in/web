// eslint-disable-next-line max-classes-per-file
import * as routingControllers from 'routing-controllers';
import ResponseBody from '../types/ResponseBody';
import ErrorResponseBody from '../types/ErrorResponseBody';

declare module 'routing-controllers' {
  export class HttpError extends Error {
    httpCode: number;

    constructor(httpCode: number, message?: string);

    toJSON(): ResponseBody<string>;
  }

  export class BadRequestError {
    toJSON(): ErrorResponseBody<string>;
  }
}

declare module 'test';
