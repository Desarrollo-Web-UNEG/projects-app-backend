import { Module } from '@nestjs/common';
import { TechnologyService } from '@technology/services/technology.service';
import { TechnologyController } from '@technology/controllers/technology.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Technology } from '@technology/entities/technology.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Technology])],
  providers: [TechnologyService],
  controllers: [TechnologyController],
  exports: [TechnologyService],
})
export class TechnologyModule {}
