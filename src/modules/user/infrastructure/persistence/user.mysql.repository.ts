import { NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { IUserRepository } from '../../application/repository/user.repository.interface';
import { User } from '../../domain/user.entity';
import { UserSchema } from './user.schema';

export class UserMysqlRepository implements IUserRepository {
  constructor(
    @InjectRepository(UserSchema)
    private readonly repository: Repository<User>,
  ) {}

  async create(user: User): Promise<User> {
    return this.repository.save(user);
  }

  async findOneByEmail(email: string): Promise<User> {
    return this.repository.findOne({
      where: { email },
    });
  }

  async findOneByEmailOrFail(email: string): Promise<User> {
    const user = await this.repository.findOne({
      where: { email },
    });

    if (!user) {
      throw new NotFoundException(`User with email ${email} not found`);
    }

    return user;
  }

  async updateByEmailOrFail(email: string, updates: User): Promise<User> {
    const { id } = await this.findOneByEmailOrFail(email);

    const userToUpdate = await this.repository.preload({
      ...updates,
      id,
    });

    return this.repository.save(userToUpdate);
  }
}
