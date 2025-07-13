import { Module } from '@nestjs/common';
import { BadgeController } from './controllers/badge/badge.controller';
import { BadgeService } from './services/badge.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Badge } from './entities/badge.entity';
import { People } from '@people/entities';

@Module({
  imports: [TypeOrmModule.forFeature([Badge, People])],
  controllers: [BadgeController],
  providers: [BadgeService],
  exports: [BadgeService],
})
export class BadgeModule {}