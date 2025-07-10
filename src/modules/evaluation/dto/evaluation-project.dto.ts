import { IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateEvaluationProjectDto {
  @IsNumber()
  id_project: number;

  @IsNumber()
  id_evaluation: number;

  @IsNumber()
  score: number;

  @IsString()
  @IsOptional()
  description?: string;
}

import { PartialType } from '@nestjs/swagger';

export class UpdateEvaluationProjectDto extends PartialType(CreateEvaluationProjectDto) {}