import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';

import { Track } from '../../domain/track.entity';
import { CreateTrackDto } from '../../interface/dto/create-track.dto';
import { GetUserTrackDto } from '../../interface/dto/get-user-track.dto';
import { GetUserTracksDto } from '../../interface/dto/get-user-tracks.dto';
import { UpdateTrackDto } from '../../interface/dto/update-track.dto';
import {
  fromCreateTrackDtoToTrack,
  fromUpdateTrackDtoToTrack,
} from '../mapper/track.mapper';
import {
  ITrackRepository,
  TRACK_REPOSITORY_KEY,
} from '../repository/track.repository.interface';

@Injectable()
export class TrackService {
  constructor(
    @Inject(TRACK_REPOSITORY_KEY)
    private readonly trackRepository: ITrackRepository,
  ) {}

  async create(createTrackDto: CreateTrackDto): Promise<Track> {
    try {
      const trackMapper = fromCreateTrackDtoToTrack(createTrackDto);

      return await this.trackRepository.create(trackMapper);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.CONFLICT);
    }
  }

  async findByUserIdMonthAndYear(
    getUserTracksDto: GetUserTracksDto,
  ): Promise<Track[]> {
    const { userId, month, year } = getUserTracksDto;

    return this.trackRepository.findByUserIdMonthAndYear(userId, month, year);
  }

  async findOneByUserIdDayMonthAndYear(
    getUserTrackDto: GetUserTrackDto,
  ): Promise<Track> {
    const { userId, day, month, year } = getUserTrackDto;

    return this.trackRepository.findOneByUserIdDayMonthAndYear(
      userId,
      day,
      month,
      year,
    );
  }

  async findOneById(id: number): Promise<Track> {
    return this.trackRepository.findOneById(id);
  }

  async findOneByIdOrFail(id: number): Promise<Track> {
    return this.trackRepository.findOneByIdOrFail(id);
  }

  async updateOrFail(id: number, updates: UpdateTrackDto): Promise<Track> {
    const updatesMapped = fromUpdateTrackDtoToTrack(updates);

    const trackUpdated = await this.trackRepository.updateOrFail(
      id,
      updatesMapped,
    );

    return trackUpdated;
  }
}
