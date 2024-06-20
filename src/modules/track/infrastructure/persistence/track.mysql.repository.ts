import { NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { TrackRepository } from '../application/repository/track.repository.interface';
import { Track } from '../domain/track.entity';
import { TrackSchema } from './persistence/track.schema';

export class TrackMysqlRepository implements TrackRepository {
  constructor(
    @InjectRepository(TrackSchema)
    private readonly repository: Repository<Track>,
  ) {}

  async create(track: Track): Promise<Track> {
    return this.repository.save(track);
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
}
