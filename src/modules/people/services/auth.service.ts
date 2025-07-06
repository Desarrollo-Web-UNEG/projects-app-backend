import {
  Injectable,
  ConflictException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { People, UserStatus, UserType } from '@people/entities/people.entity';
import { RegisterPeopleDto } from '@people/dto/register-people.dto';
import * as bcrypt from 'bcrypt';

/**
 * Servicio para la autenticación y registro de usuarios
 */
@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(People)
    private peopleRepository: Repository<People>,
  ) {}

  /**
   * Registra un nuevo usuario
   * @param registerDto Datos del usuario a registrar
   */
  async register(registerDto: RegisterPeopleDto): Promise<People> {
    const existingUserEmail = await this.peopleRepository.findOne({
      where: { email: registerDto.email.toLowerCase() },
    });

    if (existingUserEmail) {
      throw new ConflictException('El correo electrónico ya está registrado');
    }

    const existingUserIdNumber = await this.peopleRepository.findOne({
      where: { id_number: registerDto.id_number.toLowerCase() },
    });

    if (existingUserIdNumber) {
      throw new ConflictException('La cedula ya está registrada');
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

  /**
   * Valida las credenciales de un usuario
   * @param email Email del usuario
   * @param password Contraseña del usuario
   */
  async validateUser(email: string, password: string): Promise<People> {
    const user = await this.findByEmail(email.toLowerCase());

    if (user.status !== UserStatus.APPROVED) {
      throw new UnauthorizedException('Tu cuenta aún no ha sido aprobada');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Credenciales inválidas');
    }

    return user;
  }

  /**
   * Busca un usuario por su email
   * @param email Email del usuario
   */
  async findByEmail(email: string): Promise<People> {
    const user = await this.peopleRepository.findOne({
      where: { email: email.toLowerCase() },
    });

    if (!user) {
      throw new UnauthorizedException('Usuario no encontrado');
    }

    return user;
  }
}
