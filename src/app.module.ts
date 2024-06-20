import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';

import { configuration } from '@configuration/configuration';
import { configurationValidate } from '@configuration/configuration.validate';
import { datasourceOptions } from '@configuration/orm.configuration';

import { CommonModule } from '@common/common.module';

import { AuthorModule } from '@/modules/author/author.module';
import { BookModule } from '@/modules/book/book.module';

import { JwtGuard } from './modules/iam/authentication/infrastructure/guard/jwt.guard';
import { JwtStrategy } from './modules/iam/authentication/infrastructure/strategy/jwt.strategy';
import { IamModule } from './modules/iam/iam.module';
import { UserModule } from './modules/user/user.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
      validationSchema: configurationValidate,
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      useFactory: () => ({
        ...datasourceOptions,
        autoLoadEntities: true,
      }),
      dataSourceFactory: async (options) => {
        return new DataSource(options).initialize();
      },
    }),
    CommonModule,
    AuthorModule,
    BookModule,
    UserModule,
    IamModule,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtGuard,
    },
    JwtStrategy,
  ],
})
export class AppModule {}
