import { sign } from 'jsonwebtoken';

import { Repository } from 'typeorm';
import UserService from '../index';
import User from '../../../entities/User';

import { User as IUser } from '../types';

jest.mock('jsonwebtoken');

const id = 1;

const signMock = sign as jest.Mock;

const findOne = jest.fn();
const save = jest.fn(entity => {
  const newEntity = entity;
  if (!newEntity.id) {
    newEntity.id = id;
  }

  return newEntity;
});

const mockUserRepository = {
  findOne,
  save,
};

signMock.mockReturnValue('jsonwebtoken');

process.env.PRIVATE_KEY = 'privatekey';

describe('UserService', () => {
  const userService = new UserService(
    (mockUserRepository as unknown) as Repository<User>
  );

  beforeEach(() => {
    mockUserRepository.findOne.mockClear();
    mockUserRepository.save.mockClear();
  });

  describe('saveOrUpdate', () => {
    it('should create new user if user does not exist', async () => {
      mockUserRepository.findOne.mockReturnValue(undefined);

      const user: IUser = {
        accessToken: 'token',
        firstName: 'First',
        lastName: 'Last',
        email: 'test@test.com',
      };

      const savedUser = await userService.saveOrUpdate(user);

      expect(mockUserRepository.findOne).toHaveBeenCalledWith({
        email: 'test@test.com',
      });

      expect(savedUser).toBeDefined();

      expect(savedUser.id).toEqual(1);
      expect(savedUser.firstName).toEqual('First');
      expect(savedUser.lastName).toEqual('Last');
      expect(savedUser.email).toEqual('test@test.com');
    });

    it('should only update user if user already exists', async () => {
      const mockUser = new User();

      mockUser.id = 20;
      mockUser.firstName = 'Initial first';
      mockUser.lastName = 'Initial last';
      mockUser.email = 'test@test.com';

      mockUserRepository.findOne.mockReturnValue(mockUser);

      const user: IUser = {
        accessToken: 'token',
        firstName: 'First',
        lastName: 'Last',
        email: 'test@test.com',
      };

      const savedUser = await userService.saveOrUpdate(user);

      expect(mockUserRepository.findOne).toHaveBeenCalledWith({
        email: 'test@test.com',
      });

      expect(mockUserRepository.save).toHaveBeenCalledWith(mockUser);

      expect(savedUser).toBeDefined();

      expect(savedUser.id).toEqual(20);
      expect(savedUser.firstName).toEqual('First');
      expect(savedUser.lastName).toEqual('Last');
      expect(savedUser.email).toEqual('test@test.com');
    });
  });

  describe('generateToken', () => {
    it('should return JWT token when called with accessToken and id', () => {
      const jwtToken = userService.generateToken(1, 'accesstoken');

      expect(jwtToken).toEqual('jsonwebtoken');

      expect(signMock).toHaveBeenCalledWith(
        { id: 1, accessToken: 'accesstoken' },
        'privatekey',
        {
          expiresIn: 60 * 60,
        }
      );
    });

    it('should throw error if called with an undefined or null parameter', () => {
      expect(() => {
        userService.generateToken(1, undefined);
      }).toThrowError(
        new Error('id and accessToken cannot be null/undefined!')
      );

      expect(() => {
        userService.generateToken(1, null);
      }).toThrowError(
        new Error('id and accessToken cannot be null/undefined!')
      );

      expect(() => {
        userService.generateToken(undefined, 'token');
      }).toThrowError(
        new Error('id and accessToken cannot be null/undefined!')
      );

      expect(() => {
        userService.generateToken(null, 'token');
      }).toThrowError(
        new Error('id and accessToken cannot be null/undefined!')
      );
    });
  });
});
