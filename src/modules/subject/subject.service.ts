import {
  Injectable,
  ConflictException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Subject } from './subject.entity';
import { CreateSubjectDto, UpdateSubjectDto } from './subject.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class SubjectService {
  constructor(
    @InjectRepository(Subject)
    private readonly subjectRepository: Repository<Subject>,
  ) {}

  async create(create: CreateSubjectDto): Promise<Subject> {
    const existingSubject = await this.subjectRepository.findOne({
      where: { name: create.name },
    });

    if (existingSubject) {
      throw new ConflictException(
        `El nombre de la materia ${create.name} ya esta registrado`,
      );
    }

    const subject = this.subjectRepository.create({
      ...create,
      isActive: true,
    });

    return this.subjectRepository.save(subject);
  }

  async findAll(): Promise<Subject[]> {
    return await this.subjectRepository.find({
      select: {
        isActive: true,
        name: true,
      },
    });
  }

  async findById(id: string): Promise<Subject> {
    const subject = await this.subjectRepository.findOne({
      where: { id, isActive: true },
    });

    if (!subject) {
      throw new NotFoundException(`No se encuentra materia con el id ${id}`);
    }

    return subject;
  }

  async findByName(name: string): Promise<Subject> {
    const subject = await this.subjectRepository.findOne({
      where: { name, isActive: true },
    });

    if (!subject) {
      throw new NotFoundException(
        `No se encuentra materia con el nombre ${name}`,
      );
    }

    return subject;
  }

  async updateById(id: string, changes: UpdateSubjectDto): Promise<Subject> {
    const subject = await this.findById(id);

    if (!subject) {
      throw new NotFoundException('Materia no encontrada');
    }

    if (changes.name && changes.name !== subject.name) {
      const existingSubject = await this.findByName(changes.name);
      if (existingSubject) {
        throw new ConflictException(
          `El nombre de la materia ${changes.name} ya esta registrado`,
        );
      }
    }

    Object.assign(subject, changes);
    return await this.subjectRepository.save(subject);
  }

  async deleteById(id: string): Promise<string> {
    const subject = await this.findById(id);

    if (!subject) {
      throw new NotFoundException('Materia no encontrada');
    }

    subject.isActive = false;
    await this.subjectRepository.save(subject);
    return `Se elimino la materia ${subject.name}`;
  }
}
