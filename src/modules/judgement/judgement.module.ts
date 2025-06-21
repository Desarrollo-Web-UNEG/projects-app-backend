import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JudgementController } from '@judgement/controllers/judgement.controller';
import { JudgementService } from '@judgement/services/judgement.service';
import { JudgementRepository } from '@judgement/services/judgement.repository';
import { Judgement } from '@judgement/entities/judgement.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Judgement])],
  controllers: [JudgementController],
  providers: [JudgementService, JudgementRepository],
  exports: [JudgementService],
})
export class JudgementModule {} 