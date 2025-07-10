import {
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Evaluation } from '../entities/evaluation.entity';
import { CreateEvaluationDto, UpdateEvaluationDto } from '../dto/evaluation.dto';
import { People } from '@people/entities/people.entity';

@Injectable()
export class EvaluationService {
  constructor(
    @InjectRepository(Evaluation)
    private readonly evaluationRepository: Repository<Evaluation>,

    @InjectRepository(People)
    private readonly peopleRepository: Repository<People>,
  ) {}

  async create(dto: CreateEvaluationDto): Promise<Evaluation> {
    const evaluator = await this.peopleRepository.findOne({
      where: { id: String(dto.evaluatorId) },
    });
    if (!evaluator) throw new NotFoundException('Evaluador no encontrado');

    const evaluation = this.evaluationRepository.create({
      score: dto.score,
      title: dto.title,
      description: dto.description,
      evaluator,
    });

    return this.evaluationRepository.save(evaluation);
  }

  async findAll(): Promise<Evaluation[]> {
    return this.evaluationRepository.find({
      relations: ['evaluator', 'judgements'],
    });
  }

  async findById(id: number): Promise<Evaluation> {
    const evaluation = await this.evaluationRepository.findOne({
      where: { id },
      relations: ['evaluator', 'judgements'],
    });

    if (!evaluation) throw new NotFoundException('Evaluación no encontrada');
    return evaluation;
  }

  async updateById(id: number, dto: UpdateEvaluationDto): Promise<Evaluation> {
    const evaluation = await this.findById(id);

    if (dto.evaluatorId) {
      const evaluator = await this.peopleRepository.findOne({
        where: { id: String(dto.evaluatorId) },
      });
      if (!evaluator) throw new NotFoundException('Evaluador no encontrado');
      evaluation.evaluator = evaluator;
    }

    evaluation.score = dto.score ?? evaluation.score;
    evaluation.title = dto.title ?? evaluation.title;
    evaluation.description = dto.description ?? evaluation.description;

    return this.evaluationRepository.save(evaluation);
  }

  async deleteById(id: number): Promise<string> {
    const evaluation = await this.findById(id);

    await this.evaluationRepository.remove(evaluation);

    return `Evaluación con ID ${id} eliminada correctamente`;
  }
}
