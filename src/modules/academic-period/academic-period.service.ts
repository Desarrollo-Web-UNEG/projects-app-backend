import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AcademicPeriod } from './academic-period.entity';
import { CreateAcademicPeriodDto, UpdateAcademicPeriodDto } from './academic-period.dto';

@Injectable()
export class AcademicPeriodService {
  constructor(
    @InjectRepository(AcademicPeriod)
    private readonly academicPeriodRepository: Repository<AcademicPeriod>,
  ) {}

  async create(createDto: CreateAcademicPeriodDto): Promise<AcademicPeriod> {
    const academicPeriod = this.academicPeriodRepository.create(createDto);
    return await this.academicPeriodRepository.save(academicPeriod);
  }

  async findAll(): Promise<AcademicPeriod[]> {
    return await this.academicPeriodRepository.find();
  }

  async findById(id: number): Promise<AcademicPeriod> {
    const academicPeriod = await this.academicPeriodRepository.findOne({
      where: { id },
    });

    if (!academicPeriod) {
      throw new NotFoundException(`No se encuentra período académico con el id ${id}`);
    }

    return academicPeriod;
  }

  async update(id: number, updateDto: UpdateAcademicPeriodDto): Promise<AcademicPeriod> {
    const academicPeriod = await this.findById(id);
    Object.assign(academicPeriod, updateDto);
    return await this.academicPeriodRepository.save(academicPeriod);
  }

  async delete(id: number): Promise<string> {
    const academicPeriod = await this.findById(id);
    await this.academicPeriodRepository.remove(academicPeriod);
    return `Se eliminó el período académico ${academicPeriod.description}`;
  }
} 