import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { JwtModule } from '@nestjs/jwt';

import { TrackModule } from '../track/track.module';
import { UserModule } from '../user/user.module';
import { AUTHENTICATION_PROVIDER_SERVICE_KEY } from './authentication/application/service/authentication-provider.service.interface';
import { AuthenticationService } from './authentication/application/service/authentication.service';
import { JwtGuard } from './authentication/infrastructure/guard/jwt.guard';
import { PassportService } from './authentication/infrastructure/passport/passport.service';
import { JwtStrategy } from './authentication/infrastructure/strategy/jwt.strategy';
import { LocalStrategy } from './authentication/infrastructure/strategy/local.strategy';
import { AuthenticationController } from './authentication/interface/authentication.controller';
import { TrackOwnerPolicyHandler } from './authorization/application/policy/track/track-owner.policy';
import { UserOwnerPolicyHandler } from './authorization/application/policy/user/user-owner.policy';
import { PoliciesGuard } from './authorization/infrastructure/guard/policies.guard';
import { PolicyHandlerStorage } from './authorization/infrastructure/storage/policy-handler.storage';

@Module({
  imports: [
    UserModule,
    TrackModule,
    JwtModule.registerAsync({
      imports: [ConfigModule, UserModule],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: {
          expiresIn: parseInt(
            configService.getOrThrow<string>(
              'ACCESS_TOKEN_VALIDITY_DURATION_IN_SEC',
            ),
          ),
        },
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [AuthenticationController],
  providers: [
    LocalStrategy,
    { provide: AUTHENTICATION_PROVIDER_SERVICE_KEY, useClass: PassportService },
    {
      provide: APP_GUARD,
      useClass: JwtGuard,
    },
    { provide: APP_GUARD, useClass: PoliciesGuard },
    JwtStrategy,
    AuthenticationService,
    TrackOwnerPolicyHandler,
    UserOwnerPolicyHandler,
    PolicyHandlerStorage,
  ],
})
export class IamModule {}
