import { IsNumber, IsOptional, IsString, Min} from 'class-validator';

export class CreateEvaluationProjectDto {
  @IsNumber()
  id_project: number;

  @IsNumber()
  id_evaluation: number;

  @IsNumber()
  @Min(0, { message: 'La nota no puede ser negativa' })
  score: number;

  @IsString()
  @IsOptional()
  description?: string;
}

import { PartialType } from '@nestjs/swagger';

export class UpdateEvaluationProjectDto extends PartialType(CreateEvaluationProjectDto) {}