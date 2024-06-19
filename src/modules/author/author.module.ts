import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { CommonModule } from '@common/common.module';

import { AuthorMysqlRepository } from '@modules/author/infrastructure/persistence/author.mysql.repository';
import { AuthorEntity } from '@modules/author/infrastructure/persistence/entities/author.entity';

import { AuthorService } from './application/service/author.service';
import { AuthorController } from './controllers/author.controller';

@Module({
  imports: [TypeOrmModule.forFeature([AuthorEntity]), CommonModule],
  controllers: [AuthorController],
  providers: [
    AuthorService,
    {
      provide: 'AUTHOR_REPOSITORY',
      useClass: AuthorMysqlRepository,
    },
  ],
  exports: [AuthorService],
})
export class AuthorModule {}
