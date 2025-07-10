import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EvaluationController } from './controllers/evaluation.controller';
import { EvaluationService } from './services/evaluation.service';
import { Evaluation } from './entities/evaluation.entity';
import { Project } from '../project/entities/project.entity';
import { People } from '../people/entities/people.entity';
import { EvaluationProject } from './entities/evaluation-project.entity';
import { EvaluationProjectController } from './controllers/evaluation-project.controller';
import { EvaluationProjectService } from './services/evaluation-project.service';

@Module({
  imports: [TypeOrmModule.forFeature([Evaluation, Project, People, EvaluationProject])],
  providers: [EvaluationService, EvaluationProjectService],
  controllers: [EvaluationController, EvaluationProjectController],
  exports: [EvaluationService, EvaluationProjectService],
})
export class EvaluationModule {}