import {
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { AcademicPeriod } from '../entities/academic-period.entity';
import { CreateAcademicPeriodDto, UpdateAcademicPeriodDto } from '../dto/academic-period.dto';
import { AcademicPeriodRepository } from './academic-period.repository';

/**
 * Servicio para la gestión de períodos académicos
 */
@Injectable()
export class AcademicPeriodService {
  constructor(
    private readonly academicPeriodRepository: AcademicPeriodRepository,
  ) {}

  /**
   * Crea un nuevo período académico
   * @param createDto Datos para crear el período académico
   */
  async create(createDto: CreateAcademicPeriodDto): Promise<AcademicPeriod> {
    return this.academicPeriodRepository.create(createDto);
  }

  /**
   * Obtiene todos los períodos académicos
   */
  async findAll(): Promise<AcademicPeriod[]> {
    return this.academicPeriodRepository.findAll();
  }

  /**
   * Obtiene un período académico por su ID
   * @param id ID del período académico
   */
  async findOne(id: number): Promise<AcademicPeriod> {
    const academicPeriod = await this.academicPeriodRepository.findById(id);

    if (!academicPeriod) {
      throw new NotFoundException('Período académico no encontrado');
    }

    return academicPeriod;
  }

  /**
   * Actualiza un período académico
   * @param id ID del período académico
   * @param updateDto Datos para actualizar el período académico
   */
  async update(
    id: number,
    updateDto: UpdateAcademicPeriodDto,
  ): Promise<AcademicPeriod> {
    const academicPeriod = await this.findOne(id);
    return this.academicPeriodRepository.update(academicPeriod, updateDto);
  }

  /**
   * Elimina un período académico
   * @param id ID del período académico
   */
  async remove(id: number): Promise<void> {
    const academicPeriod = await this.academicPeriodRepository.findByIdWithProjects(id);

    if (!academicPeriod) {
      throw new NotFoundException('Período académico no encontrado');
    }

    if (academicPeriod.projects && academicPeriod.projects.length > 0) {
      throw new ConflictException(
        'No se puede eliminar el período académico porque tiene proyectos asociados',
      );
    }

    await this.academicPeriodRepository.remove(academicPeriod);
  }
} 