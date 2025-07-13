import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SubjectPeople } from '@subject/entities/subject-people.entity';
import {
  CreateSubjectPeopleDto,
  UpdateSubjectPeopleDto,
} from '@subject/dto/subject-people.dto';
import { People, UserType } from '@people/entities/people.entity';
import { Subject } from '@subject/entities/subject.entity';
import { In } from 'typeorm';

@Injectable()
export class SubjectPeopleService {
  constructor(
    @InjectRepository(SubjectPeople)
    private readonly subjectPeopleRepo: Repository<SubjectPeople>,
    @InjectRepository(People)
    private readonly peopleRepo: Repository<People>,
    @InjectRepository(Subject)
    private readonly subjectRepo: Repository<Subject>,
  ) {}

  async findAllSubjectsByPeople(peopleId: string) {
    return this.subjectPeopleRepo.find({
      where: { people: { id: peopleId } },
      relations: ['subject'],
    });
  }

  //   Te busca las materias de la persona dependiendo de si le pides materias aprobadas o desaprobadas
  //      approved: true. Materias aprobadas por la persona
  // approved: false. Materias reprobadas por la persona
  async findSubjectsByPeopleAndApproval(peopleId: string, approved: boolean) {
    return this.subjectPeopleRepo.find({
      where: { people: { id: peopleId }, approved },
      relations: ['subject'],
    });
  }

  async assignSubjectToPeople(dto: CreateSubjectPeopleDto) {
    const people = await this.peopleRepo.findOne({
      where: { id: dto.peopleid },
    });
    if (!people) throw new NotFoundException('Persona no encontrada');

    const subject = await this.subjectRepo.findOne({
      where: { id: dto.subjectid },
    });
    if (!subject) throw new NotFoundException('Materia no encontrada');

    // Validación de requisitos si es estudiante
    if (people.user_type === 'student') {
      if (
        Array.isArray(subject.requirement) &&
        subject.requirement.length > 0
      ) {
        // Buscar materias requeridas no aprobadas
        const requirementsNotApproved = await this.subjectPeopleRepo.find({
          where: {
            people: { id: dto.peopleid },
            subject: { id: In(subject.requirement) },
            approved: false,
          },
        });
        if (requirementsNotApproved.length > 0) {
          throw new BadRequestException(
            'El estudiante no ha aprobado los requisitos previos.',
          );
        }
      }

      if (dto.approved === false && dto.mark != null) {
        throw new BadRequestException(
          'No se puede asignar una nota a una materia no aprobada para un estudiante.',
        );
      }
    }

    // Crear la relación
    const subjectPeople = this.subjectPeopleRepo.create({
      people,
      subject,
      approved: dto.approved,
    });
    return this.subjectPeopleRepo.save(subjectPeople);
  }

  async updateSubjectFromPeople(id: number, changes: UpdateSubjectPeopleDto) {
    const subjectPeople = await this.subjectPeopleRepo.findOne({
      where: { id },
      relations: ['people'],
    });
    if (!subjectPeople) throw new NotFoundException('Relación no encontrada');
    // Validación: no se puede revertir una materia aprobada a no aprobada para un estudiante
    if (
      subjectPeople.people?.user_type === UserType.STUDENT &&
      subjectPeople.approved === true &&
      changes.approved === false
    ) {
      throw new BadRequestException(
        'No se puede cambiar una materia aprobada a no aprobada para un estudiante.',
      );
    }
    // Validación: si la persona es estudiante y approved es false, no se puede asignar mark
    const isStudent = subjectPeople.people?.user_type === UserType.STUDENT;

    const approvedFinal =
      changes.approved !== undefined
        ? changes.approved
        : subjectPeople.approved;
    if (isStudent && approvedFinal === false && changes.mark != null) {
      throw new BadRequestException(
        'No se puede asignar una nota a una materia no aprobada para un estudiante.',
      );
    }
    Object.assign(subjectPeople, changes);
    return this.subjectPeopleRepo.save(subjectPeople);
  }

  async removeSubjectFromPeople(id: number) {
    const subjectPeople = await this.subjectPeopleRepo.findOne({
      where: { id },
    });
    if (!subjectPeople) throw new NotFoundException('Relación no encontrada');
    await this.subjectPeopleRepo.remove(subjectPeople);
    return { message: 'Materia removida del usuario correctamente' };
  }
}
