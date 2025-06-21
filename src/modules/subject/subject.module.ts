import { Module } from '@nestjs/common';
import { SubjectController } from '@subject/controllers/subject.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SubjectService } from '@subject/services/subject.service';
import { Subject } from '@subject/entities/subject.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Subject])],
  controllers: [SubjectController],
  providers: [SubjectService],
  exports: [SubjectService],
})
export class SubjectModule {}
