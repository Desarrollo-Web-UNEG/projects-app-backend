import {
  Injectable,
  ConflictException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Badge } from '@badge/entities/badge.entity';
import {
  CreateBadgeDto,
  UpdateBadgeDto,
  AssignBadgeDto,
} from '@badge/dto/badge.dto';
import { People, UserType } from '@people/entities/people.entity';

@Injectable()
export class BadgeService {
  constructor(
    @InjectRepository(Badge)
    private readonly badgeRepository: Repository<Badge>,
    @InjectRepository(People)
    private readonly peopleRepository: Repository<People>,
  ) {}

  async create(create: CreateBadgeDto): Promise<Badge> {
    const existingBadge = await this.badgeRepository.findOne({
      where: { name: create.name },
    });

    if (existingBadge) {
      throw new ConflictException(
        `El nombre de la insignia ${create.name} ya esta registrado`,
      );
    }

    const badge = this.badgeRepository.create(create);

    return this.badgeRepository.save(badge);
  }

  async findAll(): Promise<Badge[]> {
    return await this.badgeRepository.find({
      select: {
        id: true,
        name: true,
        description: true,
      },
    });
  }

  async findById(id: number): Promise<Badge> {
    const badge = await this.badgeRepository.findOne({
      where: { id },
    });

    if (!badge) {
      throw new NotFoundException(`No se encuentra insignia con el id ${id}`);
    }

    return badge;
  }

  async findByName(name: string): Promise<Badge> {
    const badge = await this.badgeRepository.findOne({
      where: { name },
    });

    if (!badge) {
      throw new NotFoundException(
        `No se encuentra insignia con el nombre ${name}`,
      );
    }

    return badge;
  }

  async updateById(
    id: number,
    changes: Partial<UpdateBadgeDto>,
  ): Promise<Badge> {
    const badge = await this.findById(id);

    if (!badge) {
      throw new NotFoundException('Insignia no encontrada');
    }

    if (changes.name && changes.name !== badge.name) {
      const existingBadge = await this.badgeRepository.findOne({
        where: { name: changes.name },
      });
      if (existingBadge) {
        throw new ConflictException(
          `El nombre de la insignia ${changes.name} ya esta registrado`,
        );
      }
    }

    Object.assign(badge, changes);
    return await this.badgeRepository.save(badge);
  }

  async assignBadgeToStudent(dto: AssignBadgeDto) {
    const student = await this.peopleRepository.findOne({
      where: { id: dto.peopleId },
      relations: ['badges'],
    });
    if (!student) {
      throw new NotFoundException('Estudiante no encontrado');
    }
    if (student.user_type !== UserType.STUDENT) {
      throw new ConflictException(
        'Solo se pueden asignar insignias a estudiantes',
      );
    }
    const badge = await this.badgeRepository.findOne({
      where: { id: dto.badgeId },
    });
    if (!badge) {
      throw new NotFoundException('Insignia no encontrada');
    }
    if (student.badges.some((badgeStudent) => badgeStudent.id === badge.id)) {
      throw new ConflictException('El estudiante ya tiene esta insignia');
    }
    student.badges.push(badge);
    await this.peopleRepository.save(student);
    return { message: 'Insignia asignada correctamente' };
  }
}
