import { IsNumber } from 'class-validator';

export class GetUserTrackDto {
  @IsNumber()
  userId: number;

  @IsNumber()
  day: number;

  @IsNumber()
  month: number;

  @IsNumber()
  year: number;
}
