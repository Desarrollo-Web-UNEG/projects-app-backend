import {
  IsString,
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsDateString,
  IsNumberString,
  MinLength,
  MaxLength,
  IsEnum,
} from 'class-validator';
import { UserType } from '@people/entities/people.entity';
import { PartialType, ApiProperty } from '@nestjs/swagger';

export class RegisterPeopleDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  name: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  last_name: string;

  @IsString()
  @IsOptional()
  @ApiProperty()
  address?: string;

  @IsEnum(UserType)
  @IsNotEmpty()
  @ApiProperty()
  user_type: UserType;

  @IsDateString()
  @IsOptional()
  @ApiProperty()
  birthdate?: string;

  @IsEmail()
  @IsNotEmpty()
  @ApiProperty()
  email: string;

  @IsNumberString()
  @IsOptional()
  @ApiProperty()
  phone_number?: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(5)
  @MaxLength(20)
  @ApiProperty()
  id_number: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  security_question: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  security_answer: string;

  @IsDateString()
  @IsOptional()
  @ApiProperty()
  year_of_creation?: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  @ApiProperty()
  password: string;
}
//PartialType hace que tenga la misma estructura del registerPeopleDTO
//Pero hace que sean opcionales los atributos
export class UpdatePeopleDto extends PartialType(RegisterPeopleDto) {}
