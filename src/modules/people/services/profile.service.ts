import {
  Injectable,
  NotFoundException,
  ConflictException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { People, UserStatus, UserType } from '@people/entities/people.entity';
import { UpdatePeopleDto } from '@people/dto/register-people.dto';
import * as bcrypt from 'bcrypt';
import { ProjectService } from '@project/services/project.service';
import { SubjectPeopleService } from '@subject/services/subject-people.service';

/**
 * Servicio para la gestión de perfiles de usuario
 */
@Injectable()
export class ProfileService {
  constructor(
    @InjectRepository(People)
    private peopleRepository: Repository<People>,
    private readonly projectService: ProjectService,
    private readonly subjectPeopleService: SubjectPeopleService,
  ) {}

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
   * Actualiza la contraseña de un usuario
   */
  async updateUserPassword(id: string, newPassword: string): Promise<People> {
    const user = await this.peopleRepository.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException('Usuario no encontrado');
    }
    user.password = await bcrypt.hash(newPassword, 10);
    return this.peopleRepository.save(user);
  }

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
        security_answer: true,
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

  /**
   * Busca un usuario por su cedula
   * @param cedula Cedula del usuario
   */
  async findByCedula(id_number: string): Promise<People> {
    const user = await this.peopleRepository.findOne({
      where: { id_number },
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

    if (user.status !== 'approved') {
      throw new UnauthorizedException('Usuario no aprobado');
    }

    return user;
  }

  /**
   * Obtiene estudiantes aprobados
   */
  async getApprovedStudents(): Promise<People[]> {
    return this.peopleRepository.find({
      where: { status: UserStatus.APPROVED, user_type: UserType.STUDENT },
    });
  }

  /**
   * Obtiene dashboard de estudiante
   */
  async getDashboardStudent(id: string) {
    // Validar que el id no sea vacío o nulo
    if (!id) {
      throw new NotFoundException('ID de usuario no proporcionado');
    }
    // Obtener la información del estudiante
    const user = await this.peopleRepository.findOne({
      where: { id },
      select: [
        'id',
        'name',
        'last_name',
        'user_type',
        'birthdate',
        'email',
        'id_number',
      ],
    });
    if (!user) {
      throw new NotFoundException('Usuario no encontrado');
    }

    // Eliminar el campo password antes de retornar
    // const { password, ...userWithoutPassword } = user;

    // Obtener proyectos entregados
    const projects = await this.projectService.findByStudent(id);
    const projectsCount = projects.length;

    // Obtener materias cursando actualmente
    const enrolledSubjects =
      await this.subjectPeopleService.findEnrolledSubjectsByPeople(id);
    const enrolledSubjectsCount = enrolledSubjects.length;

    return {
      user,
      projectsCount,
      enrolledSubjectsCount,
    };
  }
}
