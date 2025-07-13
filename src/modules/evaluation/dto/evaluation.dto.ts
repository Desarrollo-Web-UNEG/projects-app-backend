import { IsString, IsNotEmpty, IsOptional, IsNumber } from 'class-validator';
import { PartialType, ApiProperty } from '@nestjs/swagger';

export class CreateEvaluationDto {
    @IsNumber() 
    @ApiProperty({
        description: 'Puntuación de la evaluación',
        example: 95.5,
    })
    score: number;

    @IsString()
    @IsNotEmpty() 
    @ApiProperty({
        description: 'Título de la evaluación',
        example: 'Evaluación de Hito 1',
    })
    title: string;

    @IsString()
    @IsOptional()
    @ApiProperty({
        description: 'Descripción detallada de la evaluación',
        example: 'Revisión del cumplimiento de los objetivos iniciales.',
        required: false,
    })
    description: string;

    @IsNumber()
    @IsNotEmpty()
    @ApiProperty({
        description: 'ID del evaluador (profesor/admin) que realiza la evaluación',
        example: 2,
    })
    evaluatorId: number;
}

export class UpdateEvaluationDto extends PartialType(CreateEvaluationDto) {}
