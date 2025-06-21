import { IsString, IsNotEmpty, IsBoolean } from 'class-validator';
import { PartialType, ApiProperty } from '@nestjs/swagger';

export class CreateCategoryDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Nombre de la categoría',
    example: 'Desarrollo Web',
  })
  name: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Descripción de la categoría',
    example: 'Proyectos relacionados con tecnologías y frameworks web.',
  })
  description: string;

  @IsBoolean()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Indica si la categoría está activa',
    example: true,
  })
  isActive: boolean;
}

export class UpdateCategoryDto extends PartialType(CreateCategoryDto) {}
