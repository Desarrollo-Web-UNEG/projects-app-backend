import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ScoreController } from './controllers/score.controller';
import { ScoreService } from './services/score.service';
import { ScoreRepository } from './services/score.repository';
import { Score } from './entities/score.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Score])],
  controllers: [ScoreController],
  providers: [ScoreService, ScoreRepository],
  exports: [ScoreService],
})
export class ScoresModule {} 