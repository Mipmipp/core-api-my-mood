import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';

import { TrackOwnerPolicy } from '@/modules/iam/authorization/application/policy/track/track-owner.policy';
import { Policies } from '@/modules/iam/authorization/infrastructure/decorator/policies.decorator';

import { TrackService } from '../application/service/track.service';
import { Track } from '../domain/track.entity';
import { CreateTrackDto } from './dto/create-track.dto';
import { GetUserTrackDto } from './dto/get-user-track.dto';
import { GetUserTracksDto } from './dto/get-user-tracks.dto';
import { UpdateTrackDto } from './dto/update-track.dto';

@Controller('track')
export class TrackController {
  constructor(private readonly trackService: TrackService) {}

  @Policies(new TrackOwnerPolicy({ searchParam: 'userId' }))
  @Get('/tracks/filtered')
  async findByUserIdMonthAndYear(
    @Body() getUserTracksDto: GetUserTracksDto,
  ): Promise<Track[]> {
    return this.trackService.findByUserIdMonthAndYear(getUserTracksDto);
  }

  @Policies(new TrackOwnerPolicy({ searchParam: 'userId' }))
  @Get()
  async findOneByUserIdDayMonthAndYear(
    @Body() getUserTrackDto: GetUserTrackDto,
  ): Promise<Track> {
    return this.trackService.findOneByUserIdDayMonthAndYear(getUserTrackDto);
  }

  @Policies(new TrackOwnerPolicy({ searchParam: 'userId' }))
  @Post()
  async create(@Body() createTrackDto: CreateTrackDto): Promise<Track> {
    return this.trackService.create(createTrackDto);
  }

  @Policies(new TrackOwnerPolicy())
  @Patch(':id')
  async updateOrFail(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateTrackDto: UpdateTrackDto,
  ): Promise<Track> {
    return this.trackService.updateOrFail(id, updateTrackDto);
  }
}
