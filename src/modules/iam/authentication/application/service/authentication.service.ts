import { BadRequestException, Inject, Injectable } from '@nestjs/common';

import { UserQueryService } from '@/modules/user/application/service/user.service';
import { User } from '@/modules/user/domain/user.entity';

import { AuthenticationCredentials } from '../../interface/dto/authenticationCredentials';
import { SignUpDto } from '../../interface/dto/sign-up.dto';
import {
  AUTHENTICATION_PROVIDER_SERVICE_KEY,
  AccessToken,
  AuthenticationProviderService,
} from './authentication-provider.service.interface';

@Injectable()
export class AuthenticationService {
  constructor(
    @Inject(AUTHENTICATION_PROVIDER_SERVICE_KEY)
    private readonly authenticationProviderService: AuthenticationProviderService,
    private readonly userQueryService: UserQueryService,
  ) {}

  async validateUser(
    authenticationCredentials: AuthenticationCredentials,
  ): Promise<User> {
    const { email, password } = authenticationCredentials;

    const user = await this.userQueryService.findOneByEmail(email);

    if (!user) {
      throw new BadRequestException('User not found');
    }

    const isMatch = this.authenticationProviderService.validateUser(
      password,
      user.password,
    );

    if (!isMatch) {
      throw new BadRequestException('Password does not match');
    }

    return user;
  }

  async signUp(signUpDto: SignUpDto): Promise<AccessToken> {
    const { username, email, password } = signUpDto;

    const user = await this.userQueryService.findOneByEmail(email);

    if (user) {
      throw new BadRequestException('User already exists');
    }

    const hashedPassword = await this.authenticationProviderService.signUp(
      password,
    );

    const userToCreate = await this.userQueryService.create({
      username,
      email,
      password: hashedPassword,
    });

    await this.userQueryService.create(userToCreate);

    return this.signIn({ email, password: hashedPassword });
  }

  async signIn(
    authenticationCredentials: AuthenticationCredentials,
  ): Promise<AccessToken> {
    const accessToken = await this.authenticationProviderService.signIn(
      authenticationCredentials,
    );

    return accessToken;
  }
}
