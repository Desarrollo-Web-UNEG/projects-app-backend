import { IsString, IsNotEmpty, IsDate, IsOptional } from 'class-validator';
import { PartialType, ApiProperty } from '@nestjs/swagger';

/**
 * DTO para la creación de un período académico
 */
export class CreateAcademicPeriodDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: 'Descripción del período académico' })
  description: string;

  @IsDate()
  @IsOptional()
  @ApiProperty({ required: false, description: 'Fecha de inicio del período' })
  start_date?: Date;

  @IsDate()
  @IsOptional()
  @ApiProperty({ required: false, description: 'Fecha de fin del período' })
  end_date?: Date;

  @IsString()
  @IsOptional()
  @ApiProperty({ required: false, description: 'Observaciones adicionales' })
  observation?: string;
}

/**
 * DTO para la actualización de un período académico
 */
export class UpdateAcademicPeriodDto extends PartialType(CreateAcademicPeriodDto) {} 