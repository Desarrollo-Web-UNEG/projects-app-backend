import {
  Injectable,
  ConflictException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Category } from '../entities/category.entity';
import { CreateCategoryDto, UpdateCategoryDto } from '../dto/category.dto';


@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
  ) {}

  async create(create: CreateCategoryDto): Promise<Category> {
    const existingCategory = await this.categoryRepository.findOne({
      where: { name: create.name },
    });

    if (existingCategory) {
      throw new ConflictException(
        `El nombre de la categoría "${create.name}" ya está registrado`,
      );
    }

    const category = this.categoryRepository.create({
      ...create,
    });

    return this.categoryRepository.save(category);
  }

  async findAll(): Promise<Category[]> {
    return await this.categoryRepository.find({
      select: {
        id: true,
        name: true,
        description: true,
      },
    });
  }

  async findById(id: string): Promise<Category> {
    const category = await this.categoryRepository.findOne({
      where: { id },
    });

    if (!category) {
      throw new NotFoundException(`No se encuentra categoría con el ID "${id}"`);
    }

    return category;
  }

  async findByName(name: string): Promise<Category> {
    const category = await this.categoryRepository.findOne({
      where: { name },
    });

    if (!category) {
      throw new NotFoundException(`No se encuentra categoría con el nombre "${name}"`);
    }

    return category;
  }

  async updateById(id: string, changes: UpdateCategoryDto): Promise<Category> {
    const category = await this.findById(id);

    if (changes && changes.name && changes.name !== category.name) {
      const existing = await this.categoryRepository.findOne({
        where: { name: changes.name },
      });
      if (existing) {
        throw new ConflictException(
          `El nombre de la categoría "${changes.name}" ya está registrado`,
        );
      }
    }

    Object.assign(category, changes || {});
    return await this.categoryRepository.save(category);
  }

  async deleteById(id: string): Promise<string> {
    const category = await this.findById(id);

    await this.categoryRepository.remove(category);
    return `Se eliminó la categoría "${category.name}"`;
  }
}
