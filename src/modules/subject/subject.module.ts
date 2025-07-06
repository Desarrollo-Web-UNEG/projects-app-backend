import { Module } from '@nestjs/common';
import { SubjectController } from '@subject/controllers/subject.controller';
import { SubjectPeopleController } from '@subject/controllers/subject-people.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SubjectService } from '@subject/services/subject.service';
import { SubjectPeopleService } from '@subject/services/subject-people.service';
import { Subject } from '@subject/entities/subject.entity';
import { SubjectPeople } from '@subject/entities/subject-people.entity';
import { People } from '@people/entities';

@Module({
  imports: [TypeOrmModule.forFeature([Subject, SubjectPeople, People])],
  controllers: [SubjectController, SubjectPeopleController],
  providers: [SubjectService, SubjectPeopleService],
  exports: [SubjectService, SubjectPeopleService],
})
export class SubjectModule {}
