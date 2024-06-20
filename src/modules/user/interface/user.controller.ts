import { Body, Controller, Get, Param, Patch } from '@nestjs/common';

import { UserOwnerPolicy } from '@/modules/iam/authorization/application/policy/user/user-owner.policy';
import { Policies } from '@/modules/iam/authorization/infrastructure/decorator/policies.decorator';

import { UserQueryService } from '../application/service/user.service';
import { User } from '../domain/user.entity';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userQueryService: UserQueryService) {}

  @Policies(new UserOwnerPolicy({ searchParam: 'email' }))
  @Get(':email')
  async findOneByEmailOrFail(@Param('email') email: string): Promise<User> {
    return this.userQueryService.findOneByEmailOrFail(email);
  }

  @Policies(new UserOwnerPolicy({ searchParam: 'email' }))
  @Patch(':email')
  async updateByUsernameOrFail(
    @Param('email') email: string,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<User> {
    return this.userQueryService.updateByEmailOrFail(email, updateUserDto);
  }
}
