import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  ParseUUIDPipe,
  ParseIntPipe,
  UseGuards,
} from '@nestjs/common';
import { SubjectPeopleService } from '@subject/services/subject-people.service';
import {
  CreateSubjectPeopleDto,
  UpdateSubjectPeopleDto,
} from '@subject/dto/subject-people.dto';
import { JwtAuthGuard } from '@auth/guards/jwt-auth.guard';
import { RolesGuard } from '@auth/guards/roles.guard';
import { Roles } from '@auth/decorators/roles.decorator';
import { UserType } from '@people/entities/people.entity';

@Controller('subject-people')
export class SubjectPeopleController {
  constructor(private readonly subjectPeopleService: SubjectPeopleService) {}

  // GET: Todas las materias de un alumno
  @Get(':peopleId/subjects')
  findAllSubjectsByPeople(@Param('peopleId', ParseUUIDPipe) peopleId: string) {
    return this.subjectPeopleService.findAllSubjectsByPeople(peopleId);
  }

  // GET: Todas las materias aprobadas de un alumno
  @Get(':peopleId/subjects/approved')
  findApprovedSubjectsByPeople(
    @Param('peopleId', ParseUUIDPipe) peopleId: string,
  ) {
    return this.subjectPeopleService.findSubjectsByPeopleAndApproval(
      peopleId,
      true,
    );
  }

  // GET: Todas las materias NO aprobadas de un alumno
  @Get(':peopleId/subjects/unapproved')
  findUnapprovedSubjectsByPeople(
    @Param('peopleId', ParseUUIDPipe) peopleId: string,
  ) {
    return this.subjectPeopleService.findSubjectsByPeopleAndApproval(
      peopleId,
      false,
    );
  }

  // POST: Asignar materia a persona (estudiante/profesor)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Post()
  async assignSubjectToPeople(@Body() dto: CreateSubjectPeopleDto) {
    return this.subjectPeopleService.assignSubjectToPeople(dto);
  }

  // PUT: Actualizar estado de la materia de ese estudiante
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserType.ADMIN)
  @Put(':id')
  async updateSubjectFromPeople(
    @Param('id', ParseIntPipe) id: number,
    @Body() changes: UpdateSubjectPeopleDto,
  ) {
    return this.subjectPeopleService.updateSubjectFromPeople(id, changes);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserType.ADMIN)
  @Delete(':id')
  async removeSubjectFromPeople(@Param('id', ParseIntPipe) id: number) {
    return this.subjectPeopleService.removeSubjectFromPeople(id);
  }
}
