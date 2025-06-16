import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AcademicPeriodController } from './academic-period.controller';
import { AcademicPeriodService } from './academic-period.service';
import { AcademicPeriod } from './academic-period.entity';

@Module({
  imports: [TypeOrmModule.forFeature([AcademicPeriod])],
  controllers: [AcademicPeriodController],
  providers: [AcademicPeriodService],
  exports: [AcademicPeriodService],
})
export class AcademicPeriodModule {} 