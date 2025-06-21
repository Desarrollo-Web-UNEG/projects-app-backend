import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EvaluationController } from './controllers/evaluation.controller';
import { EvaluationService } from './services/evaluation.service';
import { Evaluation } from './entities/evaluation.entity';
import { Project } from '../project/entities/project.entity';
import { People } from '../people/entities/people.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Evaluation, Project, People])],
  providers: [EvaluationService],
  controllers: [EvaluationController],
  exports: [EvaluationService],
})
export class EvaluationModule {}