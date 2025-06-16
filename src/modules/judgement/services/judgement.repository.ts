import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Judgement } from '../entities/judgement.entity';

@Injectable()
export class JudgementRepository {
  constructor(
    @InjectRepository(Judgement)
    private readonly repository: Repository<Judgement>,
  ) {}

  async create(data: Partial<Judgement>): Promise<Judgement> {
    const judgement = this.repository.create(data);
    return await this.repository.save(judgement);
  }

  async findAll(): Promise<Judgement[]> {
    return await this.repository.find({
      relations: ['evaluations'],
    });
  }

  async findById(id: number): Promise<Judgement | null> {
    return await this.repository.findOne({
      where: { id },
      relations: ['evaluations'],
    });
  }

  async update(id: number, data: Partial<Judgement>): Promise<Judgement | null> {
    await this.repository.update(id, data);
    return await this.findById(id);
  }

  async delete(id: number): Promise<void> {
    await this.repository.delete(id);
  }
} 