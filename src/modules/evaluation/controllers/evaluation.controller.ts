import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  UseGuards,
} from '@nestjs/common';
import { EvaluationService } from '@evaluation/services/evaluation.service';
import {
  CreateEvaluationDto,
  UpdateEvaluationDto,
} from '@evaluation/dto/evaluation.dto';
import { JwtAuthGuard } from '@auth/guards/jwt-auth.guard';
import { RolesGuard } from '@auth/guards/roles.guard';
import { Roles } from '@auth/decorators/roles.decorator';
import { UserType } from '@people/entities';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('Evaluations')
@Controller('evaluations')
export class EvaluationController {
  constructor(private readonly evaluationService: EvaluationService) {}

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserType.ADMIN, UserType.PROFESSOR)
  @Post()
  @ApiOperation({ summary: 'Crear una nueva evaluación (Solo para Admin y Profesor)' })
  @ApiResponse({ status: 201, description: 'La evaluación ha sido creada exitosamente.' })
  @ApiResponse({ status: 401, description: 'No autorizado.' })
  async create(@Body() createEvaluationDto: CreateEvaluationDto) {
    return this.evaluationService.create(createEvaluationDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  @ApiOperation({ summary: 'Obtener todas las evaluaciones' })
  @ApiResponse({ status: 200, description: 'Lista de todas las evaluaciones.' })
  @ApiResponse({ status: 401, description: 'No autorizado.' })
  async findAll() {
    return this.evaluationService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  @ApiOperation({ summary: 'Obtener una evaluación por su ID' })
  @ApiResponse({ status: 200, description: 'Evaluación encontrada.' })
  @ApiResponse({ status: 404, description: 'Evaluación no encontrada.' })
  @ApiResponse({ status: 401, description: 'No autorizado.' })
  async findById(@Param('id') id: string) {
    return this.evaluationService.findById(Number(id));
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserType.ADMIN, UserType.PROFESSOR)
  @Put(':id')
  @ApiOperation({ summary: 'Actualizar una evaluación por su ID (Solo para Admin y Profesor)' })
  @ApiResponse({ status: 200, description: 'La evaluación ha sido actualizada exitosamente.' })
  @ApiResponse({ status: 404, description: 'Evaluación no encontrada.' })
  @ApiResponse({ status: 401, description: 'No autorizado.' })
  async updateById(
    @Param('id') id: string,
    @Body() updateEvaluationDto: UpdateEvaluationDto,
  ) {
    return this.evaluationService.updateById(Number(id), updateEvaluationDto);
  }
}
