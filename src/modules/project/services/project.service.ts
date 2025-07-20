import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Project } from '@project/entities/project.entity';
import { CreateProjectDto, UpdateProjectDto } from '@project/dto/project.dto';
import { People } from '@people/entities/people.entity';
import { AcademicPeriod } from '@academic-period/entities/academic-period.entity';
import { Subject } from '@subject/entities/subject.entity';
import { ProjectValidatorService } from '@project/services/project-validator.service';

/**
 * Servicio para la gestión de proyectos
 */
@Injectable()
export class ProjectService {
  constructor(
    @InjectRepository(Project)
    private readonly projectRepository: Repository<Project>,
    @InjectRepository(People)
    private readonly peopleRepository: Repository<People>,
    @InjectRepository(AcademicPeriod)
    private readonly academicPeriodRepository: Repository<AcademicPeriod>,
    @InjectRepository(Subject)
    private readonly subjectRepository: Repository<Subject>,
    private readonly projectValidator: ProjectValidatorService,
  ) {}

  private async findPeopleById(id: number): Promise<People> {
    const people = await this.peopleRepository.findOne({ where: { id: String(id) } });
    if (!people) {
      throw new NotFoundException(`Person with ID ${id} not found`);
    }
    return people;
  }

  private async findAcademicPeriodById(id: number): Promise<AcademicPeriod> {
    const academicPeriod = await this.academicPeriodRepository.findOne({ where: { id } });
    if (!academicPeriod) {
      throw new NotFoundException(`Academic Period with ID ${id} not found`);
    }
    return academicPeriod;
  }

  private async findSubjectById(id: string): Promise<Subject> {
    const subject = await this.subjectRepository.findOne({ where: { id: Number(id) } });
    if (!subject) {
      throw new NotFoundException(`Subject with ID ${id} not found`);
    }
    return subject;
  }

  /**
   * Crea un nuevo proyecto
   * @param createProjectDto Datos para crear el proyecto
   * @param peopleId ID del responsable del proyecto
   */
  async create(createProjectDto: CreateProjectDto, peopleId: number): Promise<Project> {
    const {
      academicPeriodId,
      subjectId,
      title,
      description,
      categoryId,
      technologyIds,
    } = createProjectDto;

    const people = await this.findPeopleById(peopleId);
    const academicPeriod = await this.findAcademicPeriodById(academicPeriodId);
    const subject = await this.findSubjectById(String(subjectId));

    const relatedEntities = await this.projectValidator.validateRelatedEntities(
      String(categoryId),
      technologyIds || [],
    );

    const project = new Project();
    Object.assign(project, {
      ...relatedEntities,
      academicPeriod,
      subject,
      title,
      description,
      people,
    });

    return this.projectRepository.save(project);
  }

  /**
   * Obtiene todos los proyectos
   */
  async findAll(): Promise<Project[]> {
    return this.projectRepository.find({
      relations: ['people', 'academicPeriod', 'subject', 'category', 'technologies'],
    });
  }

  /**
   * Obtiene un proyecto por su ID
   * @param id ID del proyecto
   */
  async findById(id: number): Promise<Project> {
    const project = await this.projectRepository.findOne({
      where: { id },
      relations: ['people', 'academicPeriod', 'subject', 'category', 'technologies'],
    });

    if (!project) {
      throw new NotFoundException(`Project with ID ${id} not found`);
    }

    return project;
  }

  /**
   * Actualiza un proyecto
   * @param id ID del proyecto
   * @param updateProjectDto Datos para actualizar el proyecto
   * @param peopleId ID del responsable del proyecto
   */
  async update(id: number, updateProjectDto: UpdateProjectDto, peopleId: number): Promise<Project> {
    const project = await this.findById(id);

    const {
      academicPeriodId,
      subjectId,
      title,
      description,
      categoryId,
      technologyIds,
    } = updateProjectDto;

    if (academicPeriodId) {
      project.academicPeriod = await this.findAcademicPeriodById(academicPeriodId);
    }

    if (subjectId) {
      project.subject = await this.findSubjectById(String(subjectId));
    }

    if (categoryId) {
      const relatedEntities = await this.projectValidator.validateRelatedEntities(
        categoryId,
        technologyIds || [],
      );
      Object.assign(project, {
        ...relatedEntities,
      });
    }

    Object.assign(project, {
      title: title || project.title,
      description: description || project.description,
    });

    return this.projectRepository.save(project);
  }

  /**
   * Elimina un proyecto
   * @param id ID del proyecto
   */
  async delete(id: number): Promise<void> {
    const project = await this.findById(id);
    await this.projectRepository.remove(project);
  }

  /**
   * Obtiene todos los proyectos entregados por un estudiante
   * @param peopleId ID del estudiante
   */
  async findByStudent(peopleId: string): Promise<Project[]> {
    const student = await this.peopleRepository.findOne({ where: { id: peopleId } });
    if (!student) {
      throw new NotFoundException(`Estudiante con ID ${peopleId} no encontrado`);
    }
    return this.projectRepository.find({
      where: { people: { id: peopleId } },
      relations: ['people', 'academicPeriod', 'subject', 'category', 'technologies'],
    });
  }
}