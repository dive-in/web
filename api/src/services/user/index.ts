import { Repository } from 'typeorm';
import { sign } from 'jsonwebtoken';
import { Service } from 'typedi';
import { InjectRepository } from 'typeorm-typedi-extensions';
import User from '../../entities/User';
import { User as IUser } from './types';

@Service()
export default class UserService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>
  ) {}

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
