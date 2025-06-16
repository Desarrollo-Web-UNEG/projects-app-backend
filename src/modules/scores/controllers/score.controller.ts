import { Controller, Get, Post, Body, Patch, Param, Delete, Put } from '@nestjs/common';
import { ScoreService } from '../services/score.service';
import { CreateScoreDto } from '../dto/create-score.dto';
import { Score } from '../entities/score.entity';

@Controller('scores')
export class ScoreController {
  constructor(private readonly scoreService: ScoreService) {}

  @Post()
  create(@Body() createScoreDto: CreateScoreDto): Promise<Score> {
    return this.scoreService.create(createScoreDto);
  }

  @Get()
  findAll(): Promise<Score[]> {
    return this.scoreService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Score> {
    return this.scoreService.findOne(id);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() updateScoreDto: Partial<CreateScoreDto>,
  ): Promise<Score> {
    return this.scoreService.update(id, updateScoreDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.scoreService.remove(id);
  }
} 