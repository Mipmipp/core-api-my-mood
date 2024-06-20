import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';

import { TrackService } from '../application/service/track.service';
import { Track } from '../domain/track.entity';
import { CreateTrackDto } from './dto/create-track.dto';
import { GetUserTracksDto } from './dto/get-user-tracks.dto';
import { UpdateTrackDto } from './dto/update-track.dto';

@Controller('track')
export class TrackController {
  constructor(private readonly trackService: TrackService) {}

  @Get('/tracks/filtered')
  async findByUserIdMonthAndYear(
    @Body() getUserTracksDto: GetUserTracksDto,
  ): Promise<Track[]> {
    return this.trackService.findByUserIdMonthAndYear(getUserTracksDto);
  }

  @Post()
  async create(@Body() createTrackDto: CreateTrackDto): Promise<Track> {
    return this.trackService.create(createTrackDto);
  }

  @Patch(':id')
  async updateOrFail(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateTrackDto: UpdateTrackDto,
  ): Promise<Track> {
    return this.trackService.updateOrFail(id, updateTrackDto);
  }
}
