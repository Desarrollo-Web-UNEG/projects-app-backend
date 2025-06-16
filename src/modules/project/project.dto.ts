import {
  IsString,
  IsNotEmpty,
  IsOptional,
  IsUUID,
  IsArray,
  IsNumber,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateProjectDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  title: string;

  @IsString()
  @IsOptional()
  @ApiProperty({ required: false })
  description?: string;

  @IsString()
  @IsOptional()
  @ApiProperty({ required: false })
  objectives?: string;

  @IsUUID()
  @IsNotEmpty()
  @ApiProperty()
  peopleId: string;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty()
  academicPeriodId: number;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty()
  subjectId: number;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty()
  categoryId: number;

  @IsArray()
  @IsNumber({}, { each: true })
  @IsOptional()
  @ApiProperty({ required: false, type: [Number] })
  technologyIds?: number[];
}

export class UpdateProjectDto extends CreateProjectDto {}
