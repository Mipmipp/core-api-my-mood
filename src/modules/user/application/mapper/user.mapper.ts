import { Injectable } from '@nestjs/common';

import { User } from '../../domain/user.entity';
import { UpdateUserDto } from '../../interface/dto/update-user.dto';

@Injectable()
export class UserMapper {
  fromUpdateUserDtoToUser(updateUserDto: UpdateUserDto): User {
    const user = new User();

    user.username = updateUserDto.username;

    return user;
  }
}
