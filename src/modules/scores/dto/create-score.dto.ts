import { IsNumber, IsString, IsUUID, Min, Max, IsOptional } from 'class-validator';

export class CreateScoreDto {
  @IsNumber()
  @Min(0)
  @Max(100)
  value: number;

  @IsString()
  @IsOptional()
  feedback?: string;

  @IsUUID()
  projectId: string;

  @IsUUID()
  evaluatorId: string;
} 