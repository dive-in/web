import { Repository } from 'typeorm';
import { IMiddleware } from 'koa-router';
import User from '../../entities/User';

export interface Dependencies {
  userRepository: Repository<User>;
}

export type UserControllerMiddleware = IMiddleware<{}, Dependencies>;

export interface AuthenticateUserRequest {
  accessToken: string;
}
