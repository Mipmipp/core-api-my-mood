import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

import { User } from '@/modules/user/domain/user.entity';

import {
  AccessToken,
  AuthenticationProviderService,
} from '../../application/service/authentication-provider.service.interface';

@Injectable()
export class PassportService implements AuthenticationProviderService {
  private readonly hashSalt: number;
  constructor(
    private readonly configService: ConfigService,
    private jwtService: JwtService,
  ) {
    this.hashSalt = this.configService.get('authentication.hashSalt');
  }

  validateUser(password: string, hashedPassword: string): boolean {
    return bcrypt.compareSync(password, hashedPassword);
  }

  async signUp(password: string): Promise<string> {
    const hashedPassword = await bcrypt.hash(password, this.hashSalt);

    return hashedPassword;
  }

  async signIn(user: User): Promise<AccessToken> {
    const payload = { email: user.email, id: user.id };

    return { access_token: this.jwtService.sign(payload) };
  }
}
