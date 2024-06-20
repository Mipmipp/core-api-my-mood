import { Track } from '../../domain/track.entity';

export const TRACK_REPOSITORY_KEY = 'TRACK_REPOSITORY';

export interface TrackRepository {
  create(track: Track): Promise<Track>;
  findByUserIdMonthAndYear(
    userId: number,
    month: number,
    year: number,
  ): Promise<Track[]>;
  findOneById(id: number): Promise<Track>;
  findOneByIdOrFail(id: number): Promise<Track>;
  updateOrFail(id: number, updates: Track): Promise<Track>;
}
