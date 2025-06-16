import { IsString, IsNotEmpty, IsDate, IsOptional } from 'class-validator';
import { PartialType, ApiProperty } from '@nestjs/swagger';

export class CreateAcademicPeriodDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  description: string;

  @IsDate()
  @IsOptional()
  @ApiProperty({ required: false })
  start_date?: Date;

  @IsDate()
  @IsOptional()
  @ApiProperty({ required: false })
  end_date?: Date;

  @IsString()
  @IsOptional()
  @ApiProperty({ required: false })
  observation?: string;
}

export class UpdateAcademicPeriodDto extends PartialType(CreateAcademicPeriodDto) {} 