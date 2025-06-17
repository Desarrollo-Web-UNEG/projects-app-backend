import { Injectable, NotFoundException } from '@nestjs/common';
import { ScoreRepository } from '@scores/services/score.repository';
import { CreateScoreDto } from '@scores/dto/create-score.dto';
import { Score } from '@scores/entities/score.entity';

@Injectable()
export class ScoreService {
  constructor(private readonly repository: ScoreRepository) {}

  async create(createScoreDto: CreateScoreDto): Promise<Score> {
    return await this.repository.create(createScoreDto);
  }

  async findAll(): Promise<Score[]> {
    return await this.repository.findAll();
  }

  async findOne(id: string): Promise<Score> {
    const score = await this.repository.findById(id);
    if (!score) {
      throw new NotFoundException(`Score with ID ${id} not found`);
    }
    return score;
  }

  async update(id: string, updateScoreDto: Partial<CreateScoreDto>): Promise<Score> {
    await this.findOne(id);
    return await this.repository.update(id, updateScoreDto);
  }

  async remove(id: string): Promise<void> {
    await this.findOne(id);
    await this.repository.delete(id);
  }
} 