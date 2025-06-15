import {
  Injectable,
  ConflictException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { People, UserStatus, UserType } from './people.entity';
import { RegisterPeopleDto, UpdatePeopleDto } from './dto/register-people.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class PeopleService {
  constructor(
    @InjectRepository(People)
    private peopleRepository: Repository<People>,
  ) {}

  async register(registerDto: RegisterPeopleDto): Promise<People> {
    const existingUser = await this.peopleRepository.findOne({
      where: { email: registerDto.email },
    });

    if (existingUser) {
      throw new ConflictException('El correo electrónico ya está registrado');
    }

    const hashedPassword = await bcrypt.hash(registerDto.password, 10);

    const newUser = this.peopleRepository.create({
      ...registerDto,
      password: hashedPassword,
      status:
        registerDto.user_type === UserType.ADMIN
          ? UserStatus.APPROVED
          : UserStatus.PENDING,
    });

    return this.peopleRepository.save(newUser);
  }

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

  async findByEmail(email: string): Promise<People> {
    const user = await this.peopleRepository.findOne({
      where: { email },
    });

    if (!user) {
      throw new NotFoundException('Usuario no encontrado');
    }

    return user;
  }

  async validateUser(email: string, password: string): Promise<People> {
    const user = await this.findByEmail(email);

    if (user.status !== UserStatus.APPROVED) {
      throw new UnauthorizedException('Tu cuenta aún no ha sido aprobada');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Credenciales inválidas');
    }

    return user;
  }

  async getPendingUsers(): Promise<People[]> {
    return this.peopleRepository.find({
      where: { status: UserStatus.PENDING },
    });
  }

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
