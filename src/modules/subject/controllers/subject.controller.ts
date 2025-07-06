import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { SubjectService } from '@subject/services/subject.service';
import { CreateSubjectDto, UpdateSubjectDto } from '@subject/dto/subject.dto';
import { JwtAuthGuard } from '@auth/guards/jwt-auth.guard';
import { RolesGuard } from '@auth/guards/roles.guard';
import { Roles } from '@auth/decorators/roles.decorator';
import { UserType } from '@people/entities/people.entity';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';

@ApiTags('Subjects')
@ApiBearerAuth()
@Controller('subjects')
export class SubjectController {
  constructor(private readonly subjectService: SubjectService) {}

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserType.ADMIN)
  @Post()
  @ApiOperation({ summary: 'Crear una nueva materia (Solo para Admin)' })
  @ApiResponse({ status: 201, description: 'Materia creada.' })
  @ApiResponse({ status: 401, description: 'No autorizado.' })
  async create(@Body() createSubject: CreateSubjectDto) {
    return this.subjectService.create(createSubject);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  @ApiOperation({ summary: 'Obtener todas las materias' })
  @ApiResponse({ status: 200, description: 'Lista de materias.' })
  @ApiResponse({ status: 401, description: 'No autorizado.' })
  async findAll() {
    return this.subjectService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  @ApiOperation({ summary: 'Obtener una materia por su ID' })
  @ApiResponse({ status: 200, description: 'Materia encontrada.' })
  @ApiResponse({ status: 404, description: 'Materia no encontrada.' })
  @ApiResponse({ status: 401, description: 'No autorizado.' })
  async findbyId(@Param('id') id: number) {
    return this.subjectService.findById(id);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserType.ADMIN)
  @Put(':id')
  @ApiOperation({ summary: 'Actualizar una materia por su ID (Solo para Admin)' })
  @ApiResponse({ status: 200, description: 'Materia actualizada.' })
  @ApiResponse({ status: 404, description: 'Materia no encontrada.' })
  @ApiResponse({ status: 401, description: 'No autorizado.' })
  async updateById(@Param('id') id: number, @Body() changes: UpdateSubjectDto) {
    return this.subjectService.updateById(id, changes);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserType.ADMIN)
  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar una materia por su ID (Solo para Admin)' })
  @ApiResponse({ status: 200, description: 'Materia eliminada.' })
  @ApiResponse({ status: 404, description: 'Materia no encontrada.' })
  @ApiResponse({ status: 401, description: 'No autorizado.' })
  async deleteById(@Param('id') id: number) {
    return this.subjectService.deleteById(id);
  }
}
