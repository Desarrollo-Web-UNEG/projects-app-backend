import { IsString, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateJudgementDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Nombre del criterio de evaluación',
    example: 'Originalidad',
  })
  name: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Descripción del criterio de evaluación',
    example: 'Evalúa la innovación y creatividad de la solución propuesta.',
  })
  description: string;
} 