import { IsString } from 'class-validator';

export class SignUpDto {
  @IsString()
  username: string;

  @IsString()
  email: string;

  @IsString()
  password: string;
}
