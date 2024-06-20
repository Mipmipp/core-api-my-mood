import { Inject, Injectable } from '@nestjs/common';

import { User } from '../../domain/user.entity';
import { UpdateUserDto } from '../../interface/dto/update-user.dto';
import { UserMapper } from '../mapper/user.mapper';
import {
  USER_REPOSITORY_KEY,
  UserRepository,
} from '../repository/user.repository.interface';

@Injectable()
export class UserQueryService {
  constructor(
    @Inject(USER_REPOSITORY_KEY)
    private readonly userRepository: UserRepository,
    private readonly userMapper: UserMapper,
  ) {}

  async create(user: User): Promise<User> {
    const userToCreate = new User();

    Object.assign(userToCreate, user);

    return this.userRepository.create(userToCreate);
  }

  async findOneByEmailOrFail(email: string): Promise<User> {
    return this.userRepository.findOneByEmailOrFail(email);
  }

  async updateByEmailOrFail(
    email: string,
    updateUserDto: UpdateUserDto,
  ): Promise<User> {
    return this.userRepository.updateByEmailOrFail(
      email,
      this.userMapper.fromUpdateUserDtoToUser(updateUserDto),
    );
  }
}
