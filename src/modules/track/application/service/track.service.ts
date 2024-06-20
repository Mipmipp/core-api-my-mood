import { Inject, Injectable } from '@nestjs/common';

import { Track } from '../../domain/track.entity';
import { CreateTrackDto } from '../../interface/dto/create-track.dto';
import { GetUserTracksDto } from '../../interface/dto/get-user-tracks.dto';
import { UpdateTrackDto } from '../../interface/dto/update-track.dto';
import {
  fromCreateTrackDtoToTrack,
  fromUpdateTrackDtoToTrack,
} from '../mapper/track.mapper';
import {
  TRACK_REPOSITORY_KEY,
  TrackRepository,
} from '../repository/track.repository.interface';

@Injectable()
export class TrackService {
  constructor(
    @Inject(TRACK_REPOSITORY_KEY)
    private readonly trackRepository: TrackRepository,
  ) {}

  async create(createTrackDto: CreateTrackDto): Promise<Track> {
    const trackMapper = fromCreateTrackDtoToTrack(createTrackDto);

    return await this.trackRepository.create(trackMapper);
  }

  async findByUserIdMonthAndYear(
    getUserTracksDto: GetUserTracksDto,
  ): Promise<Track[]> {
    const { userId, month, year } = getUserTracksDto;

    return this.trackRepository.findByUserIdMonthAndYear(userId, month, year);
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
