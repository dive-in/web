import { IMiddleware } from 'koa-router';
import UserService from '../../services/user';

export interface Dependencies {
  userService: UserService;
}

export type UserControllerMiddleware = IMiddleware<{}, Dependencies>;
