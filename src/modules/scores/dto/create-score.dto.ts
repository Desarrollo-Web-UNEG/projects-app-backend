import { IsNumber, IsString, IsUUID, Min, Max, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateScoreDto {
  @IsNumber()
  @Min(0)
  @Max(100)
  @ApiProperty({
    description: 'Valor de la calificación (0-100)',
    example: 88,
  })
  value: number;

  @IsString()
  @IsOptional()
  @ApiProperty({
    description: 'Feedback o retroalimentación sobre la calificación',
    example: 'Buen trabajo, pero se puede mejorar la optimización.',
    required: false,
  })
  feedback?: string;

  @IsUUID()
  @ApiProperty({
    description: 'ID del proyecto al que se le asigna la calificación',
    example: 'a1b2c3d4-e5f6-7890-1234-567890abcdef',
  })
  projectId: string;

  @IsUUID()
  @ApiProperty({
    description: 'ID del evaluador que asigna la calificación',
    example: 'a1b2c3d4-e5f6-7890-1234-567890abcdef',
  })
  evaluatorId: string;
} 