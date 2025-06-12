import { IsString, IsEmail, IsNotEmpty, IsOptional, IsDateString, IsNumberString, MinLength, MaxLength, IsEnum } from 'class-validator';
import { UserType } from '../entities/people.entity';

export class RegisterPeopleDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  last_name: string;

  @IsString()
  @IsOptional()
  address?: string;

  @IsEnum(UserType)
  @IsNotEmpty()
  user_type: UserType;

  @IsDateString()
  @IsOptional()
  birthdate?: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsNumberString()
  @IsOptional()
  phone_number?: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(5)
  @MaxLength(20)
  id_number: string;

  @IsString()
  @IsNotEmpty()
  security_question: string;

  @IsString()
  @IsNotEmpty()
  security_answer: string;

  @IsDateString()
  @IsOptional()
  year_of_creation?: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  password: string;
} 