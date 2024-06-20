import { IsNumber } from 'class-validator';

export class GetUserTracksDto {
  @IsNumber()
  userId: number;

  @IsNumber()
  month: number;

  @IsNumber()
  year: number;
}
