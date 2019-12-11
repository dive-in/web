import { ValidationError } from 'class-validator';
import ResponseBody from './ResponseBody';

export default interface ErrorResponseBody<T> extends ResponseBody<T> {
  errors: Array<ValidationError>;
}
