import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { AcademicPeriodService } from '../services/academic-period.service';
import { CreateAcademicPeriodDto, UpdateAcademicPeriodDto } from '../dto/academic-period.dto';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../../auth/guards/roles.guard';
import { Roles } from '../../auth/decorators/roles.decorator';
import { UserType } from '../../people/entities';

/**
 * Controlador para la gestión de períodos académicos
 */
@Controller('academic-periods')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(UserType.ADMIN)
export class AcademicPeriodController {
  constructor(private readonly academicPeriodService: AcademicPeriodService) {}

  /**
   * Crea un nuevo período académico
   * @param createDto Datos para crear el período académico
   */
  @Post()
  create(@Body() createDto: CreateAcademicPeriodDto) {
    return this.academicPeriodService.create(createDto);
  }

  /**
   * Obtiene todos los períodos académicos
   */
  @Get()
  findAll() {
    return this.academicPeriodService.findAll();
  }

  /**
   * Obtiene un período académico por su ID
   * @param id ID del período académico
   */
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.academicPeriodService.findOne(+id);
  }

  /**
   * Actualiza un período académico
   * @param id ID del período académico
   * @param updateDto Datos para actualizar el período académico
   */
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateDto: UpdateAcademicPeriodDto,
  ) {
    return this.academicPeriodService.update(+id, updateDto);
  }

  /**
   * Elimina un período académico
   * @param id ID del período académico
   */
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.academicPeriodService.remove(+id);
  }
} 