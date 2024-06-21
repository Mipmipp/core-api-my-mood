import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { IAccessToken } from '../application/service/authentication-provider.service.interface';
import { AuthenticationService } from '../application/service/authentication.service';
import { Public } from '../infrastructure/decorator/public.decorator';
import { AuthenticationCredentials } from './dto/authenticationCredentials';
import { SignUpDto } from './dto/sign-up.dto';

@Controller('authentication')
export class AuthenticationController {
  constructor(private readonly authenticationService: AuthenticationService) {}

  @Public()
  @Post('sign-up')
  async signUp(@Body() signUpDto: SignUpDto): Promise<IAccessToken> {
    return this.authenticationService.signUp(signUpDto);
  }

  @Public()
  @UseGuards(AuthGuard('local'))
  @Post('sign-in')
  async signIn(
    @Body() authenticationCredentials: AuthenticationCredentials,
  ): Promise<IAccessToken> {
    return this.authenticationService.signIn(authenticationCredentials);
  }
}
