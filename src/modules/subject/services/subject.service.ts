import {
  Injectable,
  ConflictException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Subject } from '@subject/entities/subject.entity';
import { CreateSubjectDto, UpdateSubjectDto } from '@subject/dto/subject.dto';

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
        id: true,
        name: true,
        description: true,
        isActive: true,
      },
    });
  }

  async findById(id: number): Promise<Subject> {
    const subject = await this.subjectRepository.findOne({
      where: { id: Number(id) },
    });

    if (!subject) {
      throw new NotFoundException(`Subject with ID ${id} not found`);
    }

    return subject;
  }

  async findByName(name: string): Promise<Subject> {
    const subject = await this.subjectRepository.findOne({
      where: { name },
    });

    if (!subject) {
      throw new NotFoundException('Materia no encontrada');
    }

    return subject;
  }

  async updateById(id: number, changes: UpdateSubjectDto): Promise<Subject> {
    const subject = await this.findById(id);

    if (!subject) {
      throw new NotFoundException('Materia no encontrada');
    }

    if (changes.name && changes.name !== subject.name) {
      const existingSubject = await this.subjectRepository.findOne({
        where: { name: changes.name },
      });
      if (existingSubject) {
        throw new ConflictException(
          `El nombre de la materia ${changes.name} ya esta registrado`,
        );
      }
    }

    Object.assign(subject, changes);
    return await this.subjectRepository.save(subject);
  }

  async deleteById(id: number): Promise<string> {
    const subject = await this.findById(id);

    if (!subject) {
      throw new NotFoundException('Materia no encontrada');
    }

    subject.isActive = false;
    await this.subjectRepository.save(subject);
    return `Se elimino la materia ${subject.name}`;
  }
}
