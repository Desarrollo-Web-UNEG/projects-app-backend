import { IsString, IsNotEmpty, IsUUID, IsOptional, IsNumber } from 'class-validator';
import { PartialType, ApiProperty } from '@nestjs/swagger';

export class CreateEvaluationDto {

    @IsNumber() 
    @ApiProperty()
    score: number;

    @IsString()
    @IsNotEmpty() 
    @ApiProperty()
    title: string;

    @IsString()
    @IsOptional()
    @ApiProperty()
    description: string;

    @IsNumber()
    @IsNotEmpty()
    @ApiProperty()
    projectId: number;

    @IsNumber()
    @IsNotEmpty()
    @ApiProperty()
    evaluatorId: number;

}

export class UpdateEvaluationDto extends CreateEvaluationDto {}
