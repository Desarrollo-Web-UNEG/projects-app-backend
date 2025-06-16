import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProjectController } from './project.controller';
import { ProjectService } from './project.service';
import { Project } from './project.entity';
import { People } from '../people/people.entity';
import { AcademicPeriod } from '../academic-period/academic-period.entity';
import { Subject } from '../subject/subject.entity';
import { Category } from '../category/category.entity';
import { Technology } from '../technology/technology.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Project,
      People,
      AcademicPeriod,
      Subject,
      Category,
      Technology,
    ]),
  ],
  controllers: [ProjectController],
  providers: [ProjectService],
  exports: [ProjectService],
})
export class ProjectModule {} 