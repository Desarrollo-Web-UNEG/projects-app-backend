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
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { SubjectPeopleService } from '@subject/services/subject-people.service';
import {
  CreateSubjectPeopleDto,
  UpdateSubjectPeopleDto,
} from '@subject/dto/subject-people.dto';

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
  @Post()
  async assignSubjectToPeople(@Body() dto: CreateSubjectPeopleDto) {
    return this.subjectPeopleService.assignSubjectToPeople(dto);
  }

  // PUT: Actualizar estado de la materia de ese estudiante
  @Put(':id')
  async updateSubjectFromPeople(
    @Param('id', ParseIntPipe) id: number,
    @Body() changes: UpdateSubjectPeopleDto,
  ) {
    return this.subjectPeopleService.updateSubjectFromPeople(id, changes);
  }

  @Delete(':id')
  async removeSubjectFromPeople(@Param('id', ParseIntPipe) id: number) {
    return this.subjectPeopleService.removeSubjectFromPeople(id);
  }
}
