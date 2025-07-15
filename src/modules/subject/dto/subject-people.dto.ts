import {
  IsString,
  IsNumber,
  IsBoolean,
  IsNotEmpty,
  IsOptional,
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

  @IsNumber()
  @IsNotEmpty()
  @IsOptional()
  @ApiProperty()
  mark: number;
}

export class UpdateSubjectPeopleDto extends PartialType(
  CreateSubjectPeopleDto,
) {}
