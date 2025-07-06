import {
  IsString,
  IsNotEmpty,
  IsBoolean,
  IsArray,
  IsNumber,
  IsOptional,
} from 'class-validator';
import { PartialType, ApiProperty } from '@nestjs/swagger';

export class CreateSubjectDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Nombre de la materia',
    example: 'Desarrollo Web',
  })
  name: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Descripción de la materia',
    example: 'Materia enfocada en la creación de aplicaciones web modernas.',
  })
  description: string;

  @IsBoolean()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Indica si la materia está activa',
    example: true,
  })
  isActive: boolean;

  @IsArray()
  @IsNumber({}, { each: true })
  @IsOptional()
  @ApiProperty({ required: false, type: [Number] })
  subjectid?: number[];
}
//PartialType hace que tenga la misma estructura del registerPeopleDTO
//Pero hace que sean opcionales los atributos
export class UpdateSubjectDto extends PartialType(CreateSubjectDto) {}
