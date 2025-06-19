import { Module } from '@nestjs/common';
import { BadgeController } from './controllers/badge/badge.controller';
import { BadgeService } from './services/badge.service';

@Module({
  controllers: [BadgeController],
  providers: [BadgeService],
})
export class BadgeModule {}
