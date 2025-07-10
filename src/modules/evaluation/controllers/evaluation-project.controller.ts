import { Controller, Get, Post, Put, Delete, Param, Body, ParseIntPipe } from '@nestjs/common';
import { EvaluationProjectService } from '../services/evaluation-project.service';
import { EvaluationProject } from '../entities/evaluation-project.entity';
import { CreateEvaluationProjectDto, UpdateEvaluationProjectDto } from '../dto/evaluation-project.dto';

@Controller('evaluation-projects')
export class EvaluationProjectController {
  constructor(private readonly service: EvaluationProjectService) {}

  @Get()
  findAll(): Promise<EvaluationProject[]> {
    return this.service.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.service.findOne(id);
  }

  @Get('project/:projectId')
  findAllByProjectId(@Param('projectId', ParseIntPipe) projectId: number) {
    return this.service.findAllByProjectId(projectId);
  }

  @Get('evaluation/:evaluationId')
  findAllByEvaluationId(@Param('evaluationId', ParseIntPipe) evaluationId: number) {
    return this.service.findAllByEvaluationId(evaluationId);
  }

  @Post()
  create(@Body() data: CreateEvaluationProjectDto) {
    return this.service.create(data);
  }

  @Put(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() data: UpdateEvaluationProjectDto) {
    return this.service.update(id, data);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.service.remove(id);
  }
} 