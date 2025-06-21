import { Injectable, ConflictException, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { People, UserStatus, UserType } from './entities/people.entity';
import { RegisterPeopleDto } from './dto/register-people.dto';
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
      status: registerDto.user_type === UserType.ADMIN ? UserStatus.APPROVED : UserStatus.PENDING,
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
} 