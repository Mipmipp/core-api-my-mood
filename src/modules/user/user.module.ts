import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UserMapper } from './application/mapper/user.mapper';
import { USER_REPOSITORY_KEY } from './application/repository/user.repository.interface';
import { UserMysqlRepository } from './infrastructure/persistence/user.mysql.repository';
import { UserSchema } from './infrastructure/persistence/user.schema';
import { UserController } from './interface/user.controller';

@Module({
  imports: [TypeOrmModule.forFeature([UserSchema])],
  controllers: [UserController],
  providers: [
    UserMapper,
    { provide: USER_REPOSITORY_KEY, useClass: UserMysqlRepository },
  ],
  exports: [{ provide: USER_REPOSITORY_KEY, useClass: UserMysqlRepository }],
})
export class UserModule {}
