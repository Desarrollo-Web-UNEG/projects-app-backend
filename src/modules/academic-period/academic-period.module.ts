import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AcademicPeriodController } from '@academic-period/academic-period.controller';
import { AcademicPeriodService, AcademicPeriodRepository } from '@academic-period/services';
import { AcademicPeriod } from '@academic-period/entities/academic-period.entity';

@Module({
  imports: [TypeOrmModule.forFeature([AcademicPeriod])],
  controllers: [AcademicPeriodController],
  providers: [AcademicPeriodService, AcademicPeriodRepository],
  exports: [AcademicPeriodService],
})
export class AcademicPeriodModule {} 