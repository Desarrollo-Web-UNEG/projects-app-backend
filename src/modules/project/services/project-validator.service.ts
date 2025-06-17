import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Category } from '../../category/entities/category.entity';
import { Technology } from '../../technology/technology.entity';

/**
 * Servicio para validar las entidades relacionadas con los proyectos
 */
@Injectable()
export class ProjectValidatorService {
  constructor(
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
    @InjectRepository(Technology)
    private readonly technologyRepository: Repository<Technology>,
  ) {}

  /**
   * Valida y obtiene todas las entidades relacionadas necesarias para un proyecto
   */
  async validateRelatedEntities(
    categoryId: string | number,
    technologyIds: number[],
  ) {
    const category = await this.categoryRepository.findOne({ where: { id: String(categoryId) } });
    if (!category) {
      throw new NotFoundException(`Category with ID ${categoryId} not found`);
    }

    const technologies = await this.technologyRepository.findByIds(technologyIds);
    if (technologies.length !== technologyIds.length) {
      throw new NotFoundException('One or more technologies not found');
    }

    return {
      category,
      technologies,
    };
  }
}