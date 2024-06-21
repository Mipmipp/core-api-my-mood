import { NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { ITrackRepository } from '../../application/repository/track.repository.interface';
import { Track } from '../../domain/track.entity';
import { TrackSchema } from './track.schema';

export class TrackMysqlRepository implements ITrackRepository {
  constructor(
    @InjectRepository(TrackSchema)
    private readonly repository: Repository<Track>,
  ) {}

  async create(track: Track): Promise<Track> {
    await this.throwIfTrackExists(track);

    return this.repository.save(track);
  }

  async findByUserIdMonthAndYear(
    userId: number,
    month: number,
    year: number,
  ): Promise<Track[]> {
    return this.repository.find({
      where: {
        userId,
        month,
        year,
      },
    });
  }

  async findOneByUserIdDayMonthAndYear(
    userId: number,
    day: number,
    month: number,
    year: number,
  ): Promise<Track> {
    return this.repository.findOne({
      where: {
        userId,
        day,
        month,
        year,
      },
    });
  }

  async findOneById(id: number): Promise<Track> {
    return this.repository.findOne({ where: { id } });
  }

  async findOneByIdOrFail(id: number): Promise<Track> {
    const track = await this.repository.findOne({ where: { id } });

    if (!track) {
      throw new NotFoundException(`Track with id "${id}" not found.`);
    }

    return track;
  }

  async updateOrFail(id: number, updates: Track): Promise<Track> {
    const trackToUpdate = await this.repository.preload({
      id,
      ...updates,
    });

    if (!trackToUpdate) {
      throw new NotFoundException(`Track with ID ${id} not found`);
    }

    return this.repository.save(trackToUpdate);
  }

  private async throwIfTrackExists(track: Track): Promise<void> {
    const { userId, day, month, year } = track;

    const trackInDb = await this.findOneByUserIdDayMonthAndYear(
      userId,
      day,
      month,
      year,
    );

    if (trackInDb) {
      throw new Error(
        `Track already exists for user ${userId} on day ${day}, month ${month} and year ${year}`,
      );
    }
  }
}
