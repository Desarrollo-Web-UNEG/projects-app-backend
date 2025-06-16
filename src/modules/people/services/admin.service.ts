import {
  Injectable,
  ConflictException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { People, UserStatus } from '../entities';
import { UpdatePeopleDto } from '../dto/register-people.dto';
import * as bcrypt from 'bcrypt';

/**
 * Servicio para operaciones administrativas de usuarios
 */
@Injectable()
export class AdminService {
  constructor(
    @InjectRepository(People)
    private peopleRepository: Repository<People>,
  ) {}

  /**
   * Obtiene todos los usuarios
   */
  async getAllUsers(): Promise<People[]> {
    return this.peopleRepository.find({
      select: {
        id: true,
        name: true,
        last_name: true,
        email: true,
        user_type: true,
        status: true,
        address: true,
        birthdate: true,
        phone_number: true,
        id_number: true,
        security_question: true,
        year_of_creation: true,
        createdAt: true,
        updatedAt: true,
      },
    });
  }

  /**
   * Obtiene usuarios pendientes de aprobación
   */
  async getPendingUsers(): Promise<People[]> {
    return this.peopleRepository.find({
      where: { status: UserStatus.PENDING },
    });
  }

  /**
   * Aprueba un usuario pendiente
   * @param userId ID del usuario a aprobar
   */
  async approveUser(userId: string): Promise<People> {
    const user = await this.peopleRepository.findOne({
      where: { id: userId },
    });

    if (!user) {
      throw new NotFoundException('Usuario no encontrado');
    }

    user.status = UserStatus.APPROVED;
    return this.peopleRepository.save(user);
  }

  /**
   * Rechaza un usuario pendiente
   * @param userId ID del usuario a rechazar
   */
  async rejectUser(userId: string): Promise<People> {
    const user = await this.peopleRepository.findOne({
      where: { id: userId },
    });

    if (!user) {
      throw new NotFoundException('Usuario no encontrado');
    }

    user.status = UserStatus.REJECTED;
    return this.peopleRepository.save(user);
  }

  /**
   * Actualiza un usuario existente
   * @param id ID del usuario a actualizar
   * @param changes Cambios a aplicar
   */
  async updateUser(id: string, changes: UpdatePeopleDto): Promise<People> {
    const user = await this.peopleRepository.findOne({
      where: { id },
    });

    if (!user) {
      throw new NotFoundException('Usuario no encontrado');
    }

    if (changes.email && changes.email !== user.email) {
      const existingUser = await this.peopleRepository.findOne({
        where: { email: changes.email },
      });
      if (existingUser) {
        throw new ConflictException('El correo electrónico ya está registrado');
      }
    }

    if (changes.password) {
      changes.password = await bcrypt.hash(changes.password, 10);
    }

    Object.assign(user, changes);

    return this.peopleRepository.save(user);
  }

  /**
   * Elimina un usuario
   * @param id ID del usuario a eliminar
   */
  async deleteUser(id: string): Promise<{ message: string; user: People }> {
    const user = await this.peopleRepository.findOne({
      where: { id },
      relations: ['badges', 'projects', 'evaluations'],
    });

    if (!user) {
      throw new NotFoundException('Usuario no encontrado');
    }

    // Verificar si el usuario tiene proyectos o evaluaciones asociadas
    if (user.projects && user.projects.length > 0) {
      throw new ConflictException(
        'No se puede eliminar el usuario porque tiene proyectos asociados',
      );
    }

    if (user.evaluations && user.evaluations.length > 0) {
      throw new ConflictException(
        'No se puede eliminar el usuario porque tiene evaluaciones asociadas',
      );
    }

    // Eliminar las relaciones con badges si existen
    if (user.badges && user.badges.length > 0) {
      user.badges = [];
      await this.peopleRepository.save(user);
    }

    await this.peopleRepository.remove(user);

    return {
      message: `Se eliminó el usuario ${user.name} ${user.last_name}`,
      user: user,
    };
  }
} 