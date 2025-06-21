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
import { AcademicPeriodService } from '@academic-period/services/academic-period.service';
import {
  CreateAcademicPeriodDto,
  UpdateAcademicPeriodDto,
} from '@academic-period/dto/academic-period.dto';
import { JwtAuthGuard } from '@auth/guards/jwt-auth.guard';
import { RolesGuard } from '@auth/guards/roles.guard';
import { Roles } from '@auth/decorators/roles.decorator';
import { UserType } from '@people/entities/people.entity';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('Academic-Periods')
@Controller('academic-periods')
export class AcademicPeriodController {
  constructor(private readonly academicPeriodService: AcademicPeriodService) {}

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserType.ADMIN)
  @Post()
  @ApiOperation({ summary: 'Crear un nuevo período académico (Solo para administradores)' })
  @ApiResponse({ status: 201, description: 'El período académico ha sido creado.' })
  @ApiResponse({ status: 401, description: 'No autorizado.' })
  async create(@Body() createDto: CreateAcademicPeriodDto) {
    return this.academicPeriodService.create(createDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  @ApiOperation({ summary: 'Obtener todos los períodos académicos' })
  @ApiResponse({ status: 200, description: 'Lista de períodos académicos.' })
  @ApiResponse({ status: 401, description: 'No autorizado.' })
  async findAll() {
    return this.academicPeriodService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  @ApiOperation({ summary: 'Obtener un período académico por su ID' })
  @ApiResponse({ status: 200, description: 'Período académico encontrado.' })
  @ApiResponse({ status: 404, description: 'Período académico no encontrado.' })
  @ApiResponse({ status: 401, description: 'No autorizado.' })
  async findById(@Param('id') id: string) {
    return this.academicPeriodService.findOne(+id);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserType.ADMIN)
  @Put(':id')
  @ApiOperation({ summary: 'Actualizar un período académico por su ID (Solo para administradores)' })
  @ApiResponse({ status: 200, description: 'Período académico actualizado.' })
  @ApiResponse({ status: 404, description: 'Período académico no encontrado.' })
  @ApiResponse({ status: 401, description: 'No autorizado.' })
  async update(
    @Param('id') id: string,
    @Body() updateDto: UpdateAcademicPeriodDto,
  ) {
    return this.academicPeriodService.update(+id, updateDto);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserType.ADMIN)
  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar un período académico por su ID (Solo para administradores)' })
  @ApiResponse({ status: 200, description: 'Período académico eliminado.' })
  @ApiResponse({ status: 404, description: 'Período académico no encontrado.' })
  @ApiResponse({ status: 401, description: 'No autorizado.' })
  async remove(@Param('id') id: string) {
    return this.academicPeriodService.remove(+id);
  }
}
