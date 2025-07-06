import { IsEmail, IsString, MinLength } from 'class-validator';
import { Transform } from 'class-transformer';

export class LoginPeopleDto {
  @IsEmail()
  @Transform(({ value }) => value.toLowerCase()) 
  email: string;

  @IsString()
  @MinLength(6)
  password: string;
} 