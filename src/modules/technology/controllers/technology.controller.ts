import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  UseGuards,
} from '@nestjs/common';
import { TechnologyService } from '@technology/services/technology.service';
import {
  CreateTechnologyDto,
  UpdateTechnologyDto,
} from '@technology/dto/technology.dto';
import { JwtAuthGuard } from '@auth/guards/jwt-auth.guard';
import { RolesGuard } from '@auth/guards/roles.guard';
import { Roles } from '@auth/decorators/roles.decorator';
import { UserType } from '@people/entities/people.entity';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('Technology')
@Controller('technology')
export class TechnologyController {
  constructor(private readonly technologyService: TechnologyService) {}

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserType.ADMIN)
  @Post()
  @ApiOperation({ summary: 'Crear una nueva tecnología (Solo para administradores)' })
  @ApiResponse({ status: 201, description: 'La tecnología ha sido creada exitosamente.' })
  @ApiResponse({ status: 401, description: 'No autorizado.' })
  async create(@Body() create: CreateTechnologyDto) {
    return this.technologyService.create(create);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  @ApiOperation({ summary: 'Obtener todas las tecnologías' })
  @ApiResponse({ status: 200, description: 'Lista de todas las tecnologías.' })
  @ApiResponse({ status: 401, description: 'No autorizado.' })
  async findAll() {
    return this.technologyService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  @ApiOperation({ summary: 'Obtener una tecnología por su ID' })
  @ApiResponse({ status: 200, description: 'Tecnología encontrada.' })
  @ApiResponse({ status: 404, description: 'Tecnología no encontrada.' })
  @ApiResponse({ status: 401, description: 'No autorizado.' })
  async findbyId(@Param('id') id: number) {
    return this.technologyService.findById(id);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserType.ADMIN)
  @Put(':id')
  @ApiOperation({ summary: 'Actualizar una tecnología por su ID (Solo para administradores)' })
  @ApiResponse({ status: 200, description: 'La tecnología ha sido actualizada exitosamente.' })
  @ApiResponse({ status: 404, description: 'Tecnología no encontrada.' })
  @ApiResponse({ status: 401, description: 'No autorizado.' })
  async updateById(
    @Param('id') id: number,
    @Body() changes: UpdateTechnologyDto,
  ) {
    return this.technologyService.updateById(id, changes);
  }
}
