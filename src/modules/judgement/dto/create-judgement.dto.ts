import { IsString } from 'class-validator';

export class CreateJudgementDto {
  @IsString()
  name: string;

  @IsString()
  description: string;
} 