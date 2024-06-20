import { IsEnum, IsOptional, IsString } from 'class-validator';

import { MoodType } from '../../domain/mood.type';

export class UpdateTrackDto {
  @IsOptional()
  @IsEnum(MoodType)
  mood?: MoodType;

  @IsOptional()
  @IsString()
  note?: string;
}
