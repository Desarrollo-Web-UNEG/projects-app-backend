import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Score } from '@scores/entities/score.entity';

@Injectable()
export class ScoreRepository {
  constructor(
    @InjectRepository(Score)
    private readonly repository: Repository<Score>,
  ) {}

  async create(data: Partial<Score>): Promise<Score> {
    const score = this.repository.create(data);
    return await this.repository.save(score);
  }

  async findAll(): Promise<Score[]> {
    return await this.repository.find({
      relations: ['project', 'evaluator'],
    });
  }

  async findById(id: string): Promise<Score> {
    const score = await this.repository.findOne({
      where: { id },
      relations: ['project', 'evaluator'],
    });

    if (!score) {
      throw new NotFoundException(`Score with ID ${id} not found`);
    }

    return score;
  }

  async update(id: string, data: Partial<Score>): Promise<Score> {
    await this.repository.update(id, data);
    return await this.findById(id);
  }

  async delete(id: string): Promise<void> {
    await this.repository.delete(id);
  }
} 