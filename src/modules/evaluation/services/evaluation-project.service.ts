import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { EvaluationProject } from '../entities/evaluation-project.entity';
import { Project } from '../../project/entities/project.entity';
import { Evaluation } from '../entities/evaluation.entity';

@Injectable()
export class EvaluationProjectService {
  constructor(
    @InjectRepository(EvaluationProject)
    private readonly evaluationProjectRepo: Repository<EvaluationProject>,
  ) {}

  async findAll() {
    return this.evaluationProjectRepo.find({
      relations: ['project', 'evaluation'],
    });
  }

  async findOne(id: number) {
    const item = await this.evaluationProjectRepo.findOne({ where: { id } });
    if (!item) throw new NotFoundException('EvaluationProject not found');
    return item;
  }

  async create(data: Partial<EvaluationProject> & { id_project?: number; id_evaluation?: number }) {
    const project = await this.evaluationProjectRepo.manager.findOne(Project, { where: { id: data.id_project } });
    const evaluation = await this.evaluationProjectRepo.manager.findOne(Evaluation, { where: { id: data.id_evaluation } });

    if (!project) throw new NotFoundException('Project not found');
    if (!evaluation) throw new NotFoundException('Evaluation not found');

    // VALIDACIÓN DE NOTA NEGATIVA Y NOTA MÁXIMA SEGÚN EVALUATION
    if (typeof data.score !== 'number') {
      throw new BadRequestException('La nota es requerida y debe ser un número');
    }
    if (data.score < 0) {
      throw new BadRequestException('La nota no puede ser negativa');
    }
    if (data.score > evaluation.score) {
      throw new BadRequestException(`La nota no puede ser mayor a la nota máxima de la evaluación (${evaluation.score})`);
    }

    const item = this.evaluationProjectRepo.create({
      ...data,
      project,
      evaluation,
    });
    return this.evaluationProjectRepo.save(item);
  }

  async update(id: number, data: Partial<EvaluationProject>) {
    const existing = await this.findOne(id);
    const evaluation = await this.evaluationProjectRepo.manager.findOne(Evaluation, { where: { id: existing.evaluation.id } });
    if (!evaluation) {
      throw new NotFoundException('Evaluation not found');
    }
    // VALIDACIÓN SOLO SI SE ACTUALIZA EL SCORE
    if (data.score !== undefined) {
      if (data.score < 0) {
        throw new BadRequestException('La nota no puede ser negativa');
      }
      if (data.score > evaluation.score) {
        throw new BadRequestException(`La nota no puede ser mayor a la nota máxima de la evaluación (${evaluation.score})`);
      }
    }

    await this.evaluationProjectRepo.update(id, data);
    return this.findOne(id);
  }

  async remove(id: number) {
    const item = await this.findOne(id);
    return this.evaluationProjectRepo.remove(item);
  }

  async findAllByProjectId(projectId: number) {
    return this.evaluationProjectRepo.find({
      where: { project: { id: projectId } },
      relations: ['project', 'evaluation'],
    });
  }

  async findAllByEvaluationId(evaluationId: number) {
    return this.evaluationProjectRepo.find({
      where: { evaluation: { id: evaluationId } },
      relations: ['project', 'evaluation'],
    });
  }
} 