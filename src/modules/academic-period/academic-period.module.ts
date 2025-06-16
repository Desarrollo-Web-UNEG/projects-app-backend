import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AcademicPeriodController } from './controllers/academic-period.controller';
import { AcademicPeriodService, AcademicPeriodRepository } from './services';
import { AcademicPeriod } from './entities/academic-period.entity';

@Module({
  imports: [TypeOrmModule.forFeature([AcademicPeriod])],
  controllers: [AcademicPeriodController],
  providers: [AcademicPeriodService, AcademicPeriodRepository],
  exports: [AcademicPeriodService],
})
export class AcademicPeriodModule {} 