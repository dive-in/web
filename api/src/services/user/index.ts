import { Repository } from 'typeorm';
import { sign } from 'jsonwebtoken';
import User from '../../entities/User';
import { User as IUser } from './types';

export default class UserService {
  private constructor(private userRepository: Repository<User>) {}

  private static instance: UserService = null;

  static getInstance(userRepository: Repository<User>): UserService {
    if (!this.instance) {
      this.instance = new UserService(userRepository);
    }

    return this.instance;
  }

  async saveOrUpdate(user: IUser): Promise<User> {
    let userEntity = await this.userRepository.findOne({
      email: user.email,
    });

    if (!userEntity) {
      userEntity = new User();
    }

    userEntity.email = user.email;
    userEntity.firstName = user.firstName;
    userEntity.lastName = user.lastName;

    return this.userRepository.save(userEntity);
  }

  generateToken(id: number, accessToken: string): string {
    if (!id || !accessToken) {
      throw new Error('id and accessToken cannot be null/undefined!');
    }

    const tokenPayload = {
      id,
      accessToken,
    };

    return sign(tokenPayload, process.env.PRIVATE_KEY, {
      expiresIn: 60 * 60,
    });
  }
}
