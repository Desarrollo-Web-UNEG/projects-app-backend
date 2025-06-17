import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { People } from '../entities/people.entity';

/**
 * Servicio para la gestión de perfiles de usuario
 */
@Injectable()
export class ProfileService {
  constructor(
    @InjectRepository(People)
    private peopleRepository: Repository<People>,
  ) {}

  /**
   * Busca un usuario por su email
   * @param email Email del usuario
   */
  async findByEmail(email: string): Promise<People> {
    const user = await this.peopleRepository.findOne({
      where: { email },
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

    if (!user) {
      throw new NotFoundException('Usuario no encontrado');
    }

    return user;
  }
} 