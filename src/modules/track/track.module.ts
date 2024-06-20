import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { TRACK_REPOSITORY_KEY } from './application/repository/track.repository.interface';
import { TrackService } from './application/service/track.service';
import { TrackSchema } from './infrastructure/persistence/track.schema';
import { TrackMysqlRepository } from './infrastructure/track.mysql.repository';
import { TrackController } from './interface/track.controller';

@Module({
  imports: [TypeOrmModule.forFeature([TrackSchema])],
  controllers: [TrackController],
  providers: [
    TrackService,
    { provide: TRACK_REPOSITORY_KEY, useClass: TrackMysqlRepository },
  ],
  exports: [
    TrackService,
    { provide: TRACK_REPOSITORY_KEY, useClass: TrackMysqlRepository },
  ],
})
export class TrackModule {}
