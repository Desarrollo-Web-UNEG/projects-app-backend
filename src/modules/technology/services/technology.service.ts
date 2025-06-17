import {
  Injectable,
  ConflictException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Technology } from '@technology/entities/technology.entity';
import { CreateTechnologyDto } from '@technology/dto/technology.dto';

@Injectable()
export class TechnologyService {
  constructor(
    @InjectRepository(Technology)
    private readonly technologyRepository: Repository<Technology>,
  ) {}

  async create(create: CreateTechnologyDto): Promise<Technology> {
    const existingTechnology = await this.technologyRepository.findOne({
      where: { name: create.name },
    });

    if (existingTechnology) {
      throw new ConflictException(
        `El nombre de la tecnologia ${create.name} ya esta registrado`,
      );
    }

    const technology = this.technologyRepository.create(create);

    return this.technologyRepository.save(technology);
  }

  async findAll(): Promise<Technology[]> {
    return await this.technologyRepository.find({
      select: {
        id: true,
        name: true,
      },
    });
  }

  async findById(id: number): Promise<Technology> {
    const technology = await this.technologyRepository.findOne({
      where: { id },
    });

    if (!technology) {
      throw new NotFoundException(`No se encuentra tecnologia con el id ${id}`);
    }

    return technology;
  }

  async findByName(name: string): Promise<Technology> {
    const technology = await this.technologyRepository.findOne({
      where: { name },
    });

    if (!technology) {
      throw new NotFoundException(
        `No se encuentra tecnologia con el nombre ${name}`,
      );
    }

    return technology;
  }

  async updateById(id: number, changes: Partial<CreateTechnologyDto>): Promise<Technology> {
    const technology = await this.findById(id);

    if (!technology) {
      throw new NotFoundException('Tecnologia no encontrada');
    }

    if (changes.name && changes.name !== technology.name) {
      const existingTechnology = await this.technologyRepository.findOne({
        where: { name: changes.name },
      });
      if (existingTechnology) {
        throw new ConflictException(
          `El nombre de la tecnologia ${changes.name} ya esta registrado`,
        );
      }
    }

    Object.assign(technology, changes);
    return await this.technologyRepository.save(technology);
  }
}
