import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Project } from './project.entity';
import { CreateProjectDto, UpdateProjectDto } from './project.dto';
import { People } from '../people/entities/people.entity';
import { AcademicPeriod } from '../academic-period/academic-period.entity';
import { Subject } from '../subject/subject.entity';
import { Category } from '../category/category.entity';
import { Technology } from '../technology/entities/technology.entity';

@Injectable()
export class ProjectService {
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

  async create(createProjectDto: CreateProjectDto): Promise<Project> {
    const {
      peopleId,
      academicPeriodId,
      subjectId,
      categoryId,
      technologyIds,
      ...projectData
    } = createProjectDto;

    // Verificar que las entidades relacionadas existan
    const people = await this.peopleRepository.findOne({
      where: { id: peopleId },
    });
    if (!people) {
      throw new NotFoundException(`Persona con ID ${peopleId} no encontrada`);
    }

    const academicPeriod = await this.academicPeriodRepository.findOne({
      where: { id: academicPeriodId },
    });
    if (!academicPeriod) {
      throw new NotFoundException(
        `Período académico con ID ${academicPeriodId} no encontrado`,
      );
    }

    const subject = await this.subjectRepository.findOne({
      where: { id: subjectId },
    });
    if (!subject) {
      throw new NotFoundException(
        `Asignatura con ID ${subjectId} no encontrada`,
      );
    }

    const category = await this.categoryRepository.findOne({
      where: { id: categoryId },
    });
    if (!category) {
      throw new NotFoundException(
        `Categoría con ID ${categoryId} no encontrada`,
      );
    }

    const technologies = technologyIds
      ? await this.technologyRepository.findByIds(technologyIds)
      : [];

    if (technologyIds && technologies.length !== technologyIds.length) {
      throw new NotFoundException(
        'Una o más tecnologías no fueron encontradas',
      );
    }

    const project = this.projectRepository.create({
      ...projectData,
      people,
      academicPeriod,
      subject,
      category,
      technologies,
    });

    return this.projectRepository.save(project);
  }

  async findAll(): Promise<Project[]> {
    return this.projectRepository.find({
      relations: [
        'people',
        'academicPeriod',
        'subject',
        'category',
        'technologies',
      ],
    });
  }

  async findById(id: number): Promise<Project> {
    const project = await this.projectRepository.findOne({
      where: { id },
      relations: [
        'people',
        'academicPeriod',
        'subject',
        'category',
        'technologies',
      ],
    });

    if (!project) {
      throw new NotFoundException(`Proyecto con ID ${id} no encontrado`);
    }

    return project;
  }

  async update(
    id: number,
    updateProjectDto: UpdateProjectDto,
  ): Promise<Project> {
    const project = await this.findById(id);

    const {
      peopleId,
      academicPeriodId,
      subjectId,
      categoryId,
      technologyIds,
      ...projectData
    } = updateProjectDto;

    // Verificar que las entidades relacionadas existan
    const people = await this.peopleRepository.findOne({
      where: { id: peopleId },
    });
    if (!people) {
      throw new NotFoundException(`Persona con ID ${peopleId} no encontrada`);
    }

    const academicPeriod = await this.academicPeriodRepository.findOne({
      where: { id: academicPeriodId },
    });
    if (!academicPeriod) {
      throw new NotFoundException(
        `Período académico con ID ${academicPeriodId} no encontrado`,
      );
    }

    const subject = await this.subjectRepository.findOne({
      where: { id: subjectId },
    });
    if (!subject) {
      throw new NotFoundException(
        `Asignatura con ID ${subjectId} no encontrada`,
      );
    }

    const category = await this.categoryRepository.findOne({
      where: { id: categoryId },
    });
    if (!category) {
      throw new NotFoundException(
        `Categoría con ID ${categoryId} no encontrada`,
      );
    }

    const technologies = technologyIds
      ? await this.technologyRepository.findByIds(technologyIds)
      : [];

    if (technologyIds && technologies.length !== technologyIds.length) {
      throw new NotFoundException(
        'Una o más tecnologías no fueron encontradas',
      );
    }

    Object.assign(project, {
      ...projectData,
      people,
      academicPeriod,
      subject,
      category,
      technologies,
    });

    return this.projectRepository.save(project);
  }

  async delete(id: number): Promise<void> {
    const project = await this.findById(id);
    await this.projectRepository.remove(project);
  }
}
