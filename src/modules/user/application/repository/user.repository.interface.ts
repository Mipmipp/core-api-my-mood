import { User } from '../../domain/user.entity';

export const USER_REPOSITORY_KEY = 'USER_REPOSITORY';

export interface IUserRepository {
  create(user: User): Promise<User>;
  findOneByEmail(email: string): Promise<User>;
  findOneByEmailOrFail(email: string): Promise<User>;
  updateByEmailOrFail(email: string, updates: User): Promise<User>;
}
