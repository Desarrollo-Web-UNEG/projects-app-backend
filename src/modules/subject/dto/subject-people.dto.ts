import {
  IsString,
  IsNumber,
  IsBoolean,
  IsNotEmpty,
  IsOptional,
  Min,
  Max,
} from 'class-validator';
import { PartialType, ApiProperty } from '@nestjs/swagger';

export class CreateSubjectPeopleDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  peopleid: string;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty()
  subjectid: number;

  @IsBoolean()
  @IsNotEmpty()
  @IsOptional()
  @ApiProperty()
  approved: boolean;

  @IsBoolean()
  @IsOptional()
  @ApiProperty()
  isEnrolled?: boolean;

  @IsNumber()
  @IsNotEmpty()
  @IsOptional()
  @Min(0, { message: 'La nota no puede ser negativa' })
  @Max(10, { message: 'La nota no puede exceder de 10' })
  @ApiProperty()
  mark: number;
}

export class UpdateSubjectPeopleDto extends PartialType(
  CreateSubjectPeopleDto,
) {}
