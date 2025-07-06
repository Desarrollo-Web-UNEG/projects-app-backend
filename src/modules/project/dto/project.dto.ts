import {
  IsString,
  IsNotEmpty,
  IsOptional,
  IsUUID,
  IsArray,
  IsNumber,
} from 'class-validator';
import { ApiProperty, PartialType } from '@nestjs/swagger';

export class CreateProjectDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: 'Título del proyecto', example: 'Mi Gran Proyecto' })
  title: string;

  @IsString()
  @IsOptional()
  @ApiProperty({
    description: 'Descripción detallada del proyecto',
    example: 'Este es un proyecto para demostrar mis habilidades.',
    required: false,
  })
  description?: string;

  @IsString()
  @IsOptional()
  @ApiProperty({
    description: 'Objetivos del proyecto',
    example: '1. Aprender NestJS. 2. Construir una API REST.',
    required: false,
  })
  objectives?: string;

  @IsUUID()
  @IsNotEmpty()
  @ApiProperty({
    description: 'ID de la persona (autor) del proyecto',
    example: 'a1b2c3d4-e5f6-7890-1234-567890abcdef',
  })
  peopleId: string;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({ description: 'ID del período académico', example: 1 })
  academicPeriodId: number;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({ description: 'ID de la materia', example: 1 })
  subjectId: number;

  @IsUUID()
  @IsNotEmpty()
  @ApiProperty({
    description: 'ID de la categoría del proyecto',
    example: 'a1b2c3d4-e5f6-7890-1234-567890abcdef',
  })
  categoryId: string;

  @IsArray()
  @IsNumber({}, { each: true })
  @IsOptional()
  @ApiProperty({
    description: 'Lista de IDs de las tecnologías usadas',
    example: [1, 2, 3],
    required: false,
    type: [Number],
  })
  technologyIds?: number[];
}

export class UpdateProjectDto extends PartialType(CreateProjectDto) {}
