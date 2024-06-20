import { IsEnum, IsNumber, IsOptional, IsString } from 'class-validator';

import { MoodType } from '../../domain/mood.type';

export class CreateTrackDto {
  @IsNumber()
  userId: number;

  @IsNumber()
  day: number;

  @IsNumber()
  month: number;

  @IsNumber()
  year: number;

  @IsEnum(MoodType)
  mood: MoodType;

  @IsOptional()
  @IsString()
  note: string;
}
