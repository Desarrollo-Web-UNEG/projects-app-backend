import { IsString, IsNumber, IsBoolean, IsNotEmpty } from 'class-validator';
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
  @ApiProperty()
  approved: boolean;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty()
  mark: number;
}

export class UpdateSubjectPeopleDto extends PartialType(
  CreateSubjectPeopleDto,
) {}
