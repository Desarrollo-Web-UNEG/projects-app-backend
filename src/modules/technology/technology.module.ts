import { Module } from '@nestjs/common';
import { TechnologyService } from './services/technology.service';
import { TechnologyController } from './controllers/technology.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Technology } from './entities/technology.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Technology])],
  providers: [TechnologyService],
  controllers: [TechnologyController],
  exports: [TechnologyService],
})
export class TechnologyModule {}
