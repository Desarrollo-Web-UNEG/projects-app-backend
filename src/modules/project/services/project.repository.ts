import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Project } from '../entities/project.entity';
import { CreateProjectDto, UpdateProjectDto } from '../dto/project.dto';
import { People } from '../../people/entities';
import { AcademicPeriod } from '../../academic-period/entities/academic-period.entity';
import { Subject } from '../../subject/entities/subject.entity';
import { Category } from '../../category/entities/category.entity';
import { Technology } from '../../technology/technology.entity';

/**
 * Repositorio para el manejo de la base de datos de proyectos
 */
@Injectable()
export class ProjectRepository {
  constructor(
    @InjectRepository(Project)
    private projectRepository: Repository<Project>,
    @InjectRepository(People)
    private peopleRepository: Repository<People>,
    @InjectRepository(AcademicPeriod)
    private academicPeriodRepository: Repository<AcademicPeriod>,
    @InjectRepository(Subject)
    private subjectRepository: Repository<Subject>,
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,
    @InjectRepository(Technology)
    private technologyRepository: Repository<Technology>,
  ) {}

  /**
   * Crea un nuevo proyecto en la base de datos
   */
  async create(project: Project): Promise<Project> {
    return this.projectRepository.save(project);
  }

  /**
   * Obtiene todos los proyectos con sus relaciones
   */
  async findAll(): Promise<Project[]> {
    return this.projectRepository.find({
      relations: ['people', 'academicPeriod', 'subject', 'category', 'technologies'],
    });
  }

  /**
   * Obtiene un proyecto por su ID con sus relaciones
   */
  async findById(id: number): Promise<Project | null> {
    return this.projectRepository.findOne({
      where: { id },
      relations: ['people', 'academicPeriod', 'subject', 'category', 'technologies'],
    });
  }

  /**
   * Actualiza un proyecto en la base de datos
   */
  async update(project: Project): Promise<Project> {
    return this.projectRepository.save(project);
  }

  /**
   * Elimina un proyecto de la base de datos
   */
  async remove(project: Project): Promise<void> {
    await this.projectRepository.remove(project);
  }

  /**
   * Busca una persona por su ID
   */
  async findPeopleById(id: number): Promise<People | null> {
    return this.peopleRepository.findOne({ where: { id: String(id) } });
  }

  /**
   * Busca un período académico por su ID
   */
  async findAcademicPeriodById(id: number): Promise<AcademicPeriod | null> {
    return this.academicPeriodRepository.findOne({ where: { id } });
  }

  /**
   * Busca una asignatura por su ID
   */
  async findSubjectById(id: number): Promise<Subject | null> {
    return this.subjectRepository.findOne({ where: { id } });
  }

  /**
   * Busca una categoría por su ID
   */
  async findCategoryById(id: string): Promise<Category | null> {
    return this.categoryRepository.findOne({ where: { id } });
  }

  /**
   * Busca tecnologías por sus IDs
   */
  async findTechnologiesByIds(ids: number[]): Promise<Technology[]> {
    return this.technologyRepository.findByIds(ids);
  }
} 