import { Module } from '@nestjs/common';
import { SubjectController } from './controllers/subject.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SubjectService } from './services/subject.service';
import { Subject } from './entities/subject.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Subject])],
  controllers: [SubjectController],
  providers: [SubjectService],
  exports: [SubjectService],
})
export class SubjectModule {}
