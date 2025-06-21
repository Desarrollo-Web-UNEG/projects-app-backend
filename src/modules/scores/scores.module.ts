import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ScoreController } from '@scores/controllers/score.controller';
import { ScoreService } from '@scores/services/score.service';
import { ScoreRepository } from '@scores/services/score.repository';
import { Score } from '@scores/entities/score.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Score])],
  controllers: [ScoreController],
  providers: [ScoreService, ScoreRepository],
  exports: [ScoreService],
})
export class ScoresModule {} 