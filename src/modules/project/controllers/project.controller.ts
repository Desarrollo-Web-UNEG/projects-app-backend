import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  UseGuards,
  Request,
} from '@nestjs/common';
import { ProjectService } from '@project/services/project.service';
import { CreateProjectDto, UpdateProjectDto } from '@project/dto/project.dto';
import { JwtAuthGuard } from '@auth/guards/jwt-auth.guard';
import { RolesGuard } from '@auth/guards/roles.guard';
import { Roles } from '@auth/decorators/roles.decorator';
import { UserType } from '@people/entities/people.entity';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
} from '@nestjs/swagger';

@ApiTags('Projects')
@ApiBearerAuth()
@Controller('projects')
export class ProjectController {
  constructor(private readonly projectService: ProjectService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  @ApiOperation({ summary: 'Crear un nuevo proyecto' })
  @ApiResponse({
    status: 201,
    description: 'El proyecto ha sido creado exitosamente.',
  })
  @ApiResponse({ status: 401, description: 'No autorizado.' })
  async create(@Body() createDto: CreateProjectDto, @Request() req) {
    return this.projectService.create(createDto, req.user.id);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  @ApiOperation({ summary: 'Obtener todos los proyectos' })
  @ApiResponse({ status: 200, description: 'Lista de todos los proyectos.' })
  @ApiResponse({ status: 401, description: 'No autorizado.' })
  async findAll() {
    return this.projectService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get('student/:peopleId')
  @ApiOperation({ summary: 'Obtener todos los proyectos entregados por un estudiante' })
  @ApiResponse({ status: 200, description: 'Lista de proyectos del estudiante.' })
  @ApiResponse({ status: 404, description: 'Estudiante no encontrado.' })
  @ApiResponse({ status: 401, description: 'No autorizado.' })
  async findByStudent(@Param('peopleId') peopleId: string) {
    return this.projectService.findByStudent(peopleId);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  @ApiOperation({ summary: 'Obtener un proyecto por su ID' })
  @ApiResponse({ status: 200, description: 'Proyecto encontrado.' })
  @ApiResponse({ status: 404, description: 'Proyecto no encontrado.' })
  @ApiResponse({ status: 401, description: 'No autorizado.' })
  async findById(@Param('id') id: number) {
    return this.projectService.findById(+id);
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  @ApiOperation({ summary: 'Actualizar un proyecto por su ID' })
  @ApiResponse({
    status: 200,
    description: 'El proyecto ha sido actualizado exitosamente.',
  })
  @ApiResponse({ status: 404, description: 'Proyecto no encontrado.' })
  @ApiResponse({
    status: 403,
    description: 'Acceso denegado (no es el autor o admin).',
  })
  @ApiResponse({ status: 401, description: 'No autorizado.' })
  async update(
    @Param('id') id: number,
    @Body() updateDto: UpdateProjectDto,
    @Request() req,
  ) {
    return this.projectService.update(+id, updateDto, req.user.id);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar un proyecto por su ID' })
  @ApiResponse({
    status: 200,
    description: 'El proyecto ha sido eliminado exitosamente.',
  })
  @ApiResponse({ status: 404, description: 'Proyecto no encontrado.' })
  @ApiResponse({ status: 401, description: 'No autorizado.' })
  async delete(@Param('id') id: number) {
    return this.projectService.delete(+id);
  }
}
