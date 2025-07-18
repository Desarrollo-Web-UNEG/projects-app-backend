import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProjectController } from '@project/controllers/project.controller';
import { ProjectService, ProjectValidatorService } from '@project/services';
import { Project } from '@project/entities/project.entity';
import { People } from '@people/entities/people.entity';
import { AcademicPeriod } from '@academic-period/entities/academic-period.entity';
import { Subject } from '@subject/entities/subject.entity';
import { Category } from '@category/entities/category.entity';
import { Technology } from '@technology/entities/technology.entity';

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
  providers: [ProjectService, ProjectValidatorService],
  exports: [ProjectService],
})
export class ProjectModule {}
