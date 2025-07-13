import {
  Injectable,
  ConflictException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { People, UserStatus, UserType } from '@people/entities/people.entity';

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
   * Obtiene todos los usuarios de tipo profesor que estén aprobados
   */
  async getAllProfessors(): Promise<People[]> {
    return this.peopleRepository.find({
      where: { 
        user_type: UserType.PROFESSOR,
        status: UserStatus.APPROVED 
      },
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
