import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AcademicPeriod } from '@academic-period/entities/academic-period.entity';
import { CreateAcademicPeriodDto, UpdateAcademicPeriodDto } from '@academic-period/dto/academic-period.dto';

/**
 * Servicio para el manejo de la base de datos de períodos académicos
 */
@Injectable()
export class AcademicPeriodRepository {
  constructor(
    @InjectRepository(AcademicPeriod)
    private academicPeriodRepository: Repository<AcademicPeriod>,
  ) {}

  /**
   * Crea un nuevo período académico en la base de datos
   */
  async create(createDto: CreateAcademicPeriodDto): Promise<AcademicPeriod> {
    const academicPeriod = this.academicPeriodRepository.create(createDto);
    return this.academicPeriodRepository.save(academicPeriod);
  }

  /**
   * Obtiene todos los períodos académicos de la base de datos
   */
  async findAll(): Promise<AcademicPeriod[]> {
    return this.academicPeriodRepository.find();
  }

  /**
   * Obtiene un período académico por su ID de la base de datos
   */
  async findById(id: number): Promise<AcademicPeriod | null> {
    return this.academicPeriodRepository.findOne({
      where: { id },
    });
  }

  /**
   * Obtiene un período académico con sus proyectos por su ID
   */
  async findByIdWithProjects(id: number): Promise<AcademicPeriod | null> {
    return this.academicPeriodRepository.findOne({
      where: { id },
      relations: ['projects'],
    });
  }

  /**
   * Actualiza un período académico en la base de datos
   */
  async update(
    academicPeriod: AcademicPeriod,
    updateDto: UpdateAcademicPeriodDto,
  ): Promise<AcademicPeriod> {
    Object.assign(academicPeriod, updateDto);
    return this.academicPeriodRepository.save(academicPeriod);
  }

  /**
   * Elimina un período académico de la base de datos
   */
  async remove(academicPeriod: AcademicPeriod): Promise<void> {
    await this.academicPeriodRepository.remove(academicPeriod);
  }
} 