import { BadRequestException, Inject, Injectable } from '@nestjs/common';

import { UserQueryService } from '@/modules/user/application/service/user.service';
import { User } from '@/modules/user/domain/user.entity';

import { AuthenticationCredentials } from '../../interface/dto/authenticationCredentials';
import { SignUpDto } from '../../interface/dto/sign-up.dto';
import {
  AUTHENTICATION_PROVIDER_SERVICE_KEY,
  IAccessToken,
  IAuthenticationProviderService,
} from './authentication-provider.service.interface';

@Injectable()
export class AuthenticationService {
  constructor(
    @Inject(AUTHENTICATION_PROVIDER_SERVICE_KEY)
    private readonly authenticationProviderService: IAuthenticationProviderService,
    private readonly userQueryService: UserQueryService,
  ) {}

  async validateUser(
    authenticationCredentials: AuthenticationCredentials,
  ): Promise<User> {
    const { email, password } = authenticationCredentials;
    const ERROR_CREDENTIALS_MESSAGE = 'Invalid credentials';

    const user = await this.userQueryService.findOneByEmail(email);

    if (!user) {
      throw new BadRequestException(ERROR_CREDENTIALS_MESSAGE);
    }

    const isMatch = this.authenticationProviderService.validateUser(
      password,
      user.password,
    );

    if (!isMatch) {
      throw new BadRequestException(ERROR_CREDENTIALS_MESSAGE);
    }

    return user;
  }

  async signUp(signUpDto: SignUpDto): Promise<IAccessToken> {
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
  ): Promise<IAccessToken> {
    const accessToken = await this.authenticationProviderService.signIn(
      authenticationCredentials,
    );

    return accessToken;
  }
}
