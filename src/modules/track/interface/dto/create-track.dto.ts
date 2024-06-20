import {
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
  Max,
  MaxLength,
  Min,
} from 'class-validator';

import { MoodType } from '../../domain/mood.type';

export class CreateTrackDto {
  @IsNumber()
  userId: number;

  @IsNumber()
  @Min(1)
  @Max(31)
  day: number;

  @IsNumber()
  @Min(1)
  @Max(12)
  month: number;

  @IsNumber()
  @Min(2024)
  @Max(2030)
  year: number;

  @IsEnum(MoodType)
  mood: MoodType;

  @IsOptional()
  @IsString()
  @MaxLength(150)
  note: string;
}
