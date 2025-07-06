import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  UseGuards,
} from '@nestjs/common';
import { ScoreService } from '@scores/services/score.service';
import { CreateScoreDto } from '@scores/dto/create-score.dto';
import { Score } from '@scores/entities/score.entity';
import { JwtAuthGuard } from '@auth/guards/jwt-auth.guard';
import { RolesGuard } from '@auth/guards/roles.guard';
import { Roles } from '@auth/decorators/roles.decorator';
import { UserType } from '@people/entities';
import { ApiTags, ApiOperation, ApiResponse, ApiBody, ApiBearerAuth } from '@nestjs/swagger';
import { PartialType } from '@nestjs/swagger';

class UpdateScoreDto extends PartialType(CreateScoreDto) {}

@ApiTags('Scores')
@ApiBearerAuth()
@Controller('scores')
@UseGuards(JwtAuthGuard)
export class ScoreController {
  constructor(private readonly scoreService: ScoreService) {}

  @Post()
  @Roles(UserType.ADMIN, UserType.PROFESSOR)
  @UseGuards(RolesGuard)
  @ApiOperation({ summary: 'Crear una nueva calificación (Solo para Admin y Profesor)' })
  @ApiResponse({ status: 201, description: 'Calificación creada.' })
  @ApiResponse({ status: 401, description: 'No autorizado.' })
  create(@Body() createScoreDto: CreateScoreDto): Promise<Score> {
    return this.scoreService.create(createScoreDto);
  }

  @Get()
  @ApiOperation({ summary: 'Obtener todas las calificaciones' })
  @ApiResponse({ status: 200, description: 'Lista de calificaciones.' })
  @ApiResponse({ status: 401, description: 'No autorizado.' })
  findAll(): Promise<Score[]> {
    return this.scoreService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener una calificación por su ID' })
  @ApiResponse({ status: 200, description: 'Calificación encontrada.' })
  @ApiResponse({ status: 404, description: 'Calificación no encontrada.' })
  @ApiResponse({ status: 401, description: 'No autorizado.' })
  findOne(@Param('id') id: string): Promise<Score> {
    return this.scoreService.findOne(id);
  }

  @Put(':id')
  @Roles(UserType.ADMIN, UserType.PROFESSOR)
  @UseGuards(RolesGuard)
  @ApiOperation({ summary: 'Actualizar una calificación por su ID (Solo para Admin y Profesor)' })
  @ApiBody({ type: UpdateScoreDto })
  @ApiResponse({ status: 200, description: 'Calificación actualizada.' })
  @ApiResponse({ status: 404, description: 'Calificación no encontrada.' })
  @ApiResponse({ status: 401, description: 'No autorizado.' })
  update(
    @Param('id') id: string,
    @Body() updateScoreDto: UpdateScoreDto,
  ): Promise<Score> {
    return this.scoreService.update(id, updateScoreDto);
  }

  @Delete(':id')
  @Roles(UserType.ADMIN, UserType.PROFESSOR)
  @UseGuards(RolesGuard)
  @ApiOperation({ summary: 'Eliminar una calificación por su ID (Solo para Admin y Profesor)' })
  @ApiResponse({ status: 200, description: 'Calificación eliminada.' })
  @ApiResponse({ status: 404, description: 'Calificación no encontrada.' })
  @ApiResponse({ status: 401, description: 'No autorizado.' })
  remove(@Param('id') id: string): Promise<void> {
    return this.scoreService.remove(id);
  }
} 