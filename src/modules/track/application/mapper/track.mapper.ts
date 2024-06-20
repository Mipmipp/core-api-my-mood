import { Track } from '../../domain/track.entity';
import { CreateTrackDto } from '../../interface/dto/create-track.dto';
import { UpdateTrackDto } from '../../interface/dto/update-track.dto';

export const fromUpdateTrackDtoToTrack = (updates: UpdateTrackDto): Track => {
  const track = new Track();

  track.mood = updates?.mood;
  track.note = updates?.note;

  return track;
};

export const fromCreateTrackDtoToTrack = (
  createTrackDto: CreateTrackDto,
): Track => {
  const track = new Track();

  track.userId = createTrackDto.userId;
  track.day = createTrackDto.day;
  track.month = createTrackDto.month;
  track.year = createTrackDto.year;
  track.mood = createTrackDto.mood;
  track.note = createTrackDto.note;

  return track;
};
