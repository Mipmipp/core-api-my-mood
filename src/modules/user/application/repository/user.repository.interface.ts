import { User } from '../../domain/user.entity';

export const USER_REPOSITORY_KEY = 'USER_REPOSITORY';

export interface UserRepository {
  create(user: User): Promise<User>;
  findOneByEmailOrFail(email: string): Promise<User>;
  updateByEmailOrFail(email: string, updates: User): Promise<User>;
}
