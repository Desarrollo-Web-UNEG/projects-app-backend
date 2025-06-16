import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JudgementController } from './controllers/judgement.controller';
import { JudgementService } from './services/judgement.service';
import { JudgementRepository } from './services/judgement.repository';
import { Judgement } from './entities/judgement.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Judgement])],
  controllers: [JudgementController],
  providers: [JudgementService, JudgementRepository],
  exports: [JudgementService],
})
export class JudgementModule {} 