import { Injectable, NotFoundException } from '@nestjs/common';
import { JudgementRepository } from './judgement.repository';
import { CreateJudgementDto } from '../dto/create-judgement.dto';
import { Judgement } from '../entities/judgement.entity';

@Injectable()
export class JudgementService {
  constructor(private readonly repository: JudgementRepository) {}

  async create(createJudgementDto: CreateJudgementDto): Promise<Judgement> {
    return await this.repository.create(createJudgementDto);
  }

  async findAll(): Promise<Judgement[]> {
    return await this.repository.findAll();
  }

  async findOne(id: number): Promise<Judgement> {
    const judgement = await this.repository.findById(id);
    if (!judgement) {
      throw new NotFoundException(`Judgement with ID ${id} not found`);
    }
    return judgement;
  }

  async update(id: number, updateJudgementDto: Partial<CreateJudgementDto>): Promise<Judgement | null> {
    await this.findOne(id);
    return await this.repository.update(id, updateJudgementDto);
  }

    async remove(id: number): Promise<void> {
    await this.findOne(id);
    await this.repository.delete(id);
  }
} 