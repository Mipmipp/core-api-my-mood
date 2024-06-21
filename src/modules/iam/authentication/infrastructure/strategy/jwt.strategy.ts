import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

import { ENVIRONMENT } from '@/configuration/orm.configuration';
import { TEST_SECRET } from '@/tests/test.constants';

import { IAccessTokenPayload } from '../../application/service/authentication-provider.service.interface';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly configService: ConfigService) {
    const options =
      process.env.NODE_ENV === ENVIRONMENT.AUTOMATED_TEST
        ? {
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: TEST_SECRET,
          }
        : {
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: configService.get('JWT_SECRET'),
          };

    super(options);
  }

  async validate(payload: IAccessTokenPayload) {
    return payload;
  }
}
