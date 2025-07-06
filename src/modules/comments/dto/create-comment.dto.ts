import { IsString, IsNotEmpty, IsDate, IsInt } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';

/**
 * CreateCommentDto
 * DTO (Data Transfer Object) utilizado para validar y tipar los datos
 * al crear un nuevo comentario.
 */
export class CreateCommentDto {
  /**
   * El contenido o texto del comentario.
   */
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'El contenido o texto del comentario.',
    example: '¡Gran trabajo en este proyecto!',
  })
  description: string;

  /**
   * La fecha en que se realizó el comentario.
   */
  @IsDate()
  @Type(() => Date)
  @ApiProperty({
    description: 'La fecha en que se realizó el comentario.',
    example: '2024-01-01T12:00:00Z',
  })
  date: Date;

  /**
   * El ID del proyecto al que pertenece este comentario (clave foránea).
   */
  @IsInt()
  @IsNotEmpty()
  @ApiProperty({
    description: 'El ID del proyecto al que pertenece este comentario.',
    example: 1,
  })
  id_project: number;

  /**
   * El ID de la persona que realiza el comentario (clave foránea).
   */
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'El ID de la persona que realiza el comentario.',
    example: 'a1b2c3d4-e5f6-7890-1234-567890abcdef',
  })
  id_people: string;
}
