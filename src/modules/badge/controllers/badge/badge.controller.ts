import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  UseGuards,
} from '@nestjs/common';
import { BadgeService } from '@badge/services/badge.service';
import { CreateBadgeDto, UpdateBadgeDto } from '@badge/dto/badge.dto';
import { JwtAuthGuard } from '@auth/guards/jwt-auth.guard';
import { RolesGuard } from '@auth/guards/roles.guard';
import { Roles } from '@auth/decorators/roles.decorator';
import { UserType } from '@people/entities/people.entity';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('Badge')
@Controller('badge')
export class BadgeController {
  constructor(private readonly badgeService: BadgeService) {}

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserType.ADMIN)
  @Post()
  @ApiOperation({ summary: 'Crear una nueva insignia (Solo para administradores)' })
  @ApiResponse({ status: 201, description: 'La insignia ha sido creada exitosamente.' })
  @ApiResponse({ status: 401, description: 'No autorizado.' })
  async create(@Body() create: CreateBadgeDto) {
    return this.badgeService.create(create);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  @ApiOperation({ summary: 'Obtener todas las insignias' })
  @ApiResponse({ status: 200, description: 'Lista de todas las insignias.' })
  @ApiResponse({ status: 401, description: 'No autorizado.' })
  async findAll() {
    return this.badgeService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  @ApiOperation({ summary: 'Obtener una insignia por su ID' })
  @ApiResponse({ status: 200, description: 'Insignia encontrada.' })
  @ApiResponse({ status: 404, description: 'Insignia no encontrada.' })
  @ApiResponse({ status: 401, description: 'No autorizado.' })
  async findbyId(@Param('id') id: number) {
    return this.badgeService.findById(id);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserType.ADMIN)
  @Put(':id')
  @ApiOperation({ summary: 'Actualizar una insignia por su ID (Solo para administradores)' })
  @ApiResponse({ status: 200, description: 'La insignia ha sido actualizada exitosamente.' })
  @ApiResponse({ status: 404, description: 'Insignia no encontrada.' })
  @ApiResponse({ status: 401, description: 'No autorizado.' })
  async updateById(@Param('id') id: number, @Body() changes: UpdateBadgeDto) {
    return this.badgeService.updateById(id, changes);
  }
}
