import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  UseGuards,
  Delete,
} from '@nestjs/common';
import { CategoryService } from '@category/services/category.service';
import { CreateCategoryDto, UpdateCategoryDto } from '@category/dto/category.dto';
import { JwtAuthGuard } from '@auth/guards/jwt-auth.guard';
import { RolesGuard } from '@auth/guards/roles.guard';
import { Roles } from '@auth/decorators/roles.decorator';
import { UserType } from '@people/entities';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('Categories')
@Controller('categories')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserType.ADMIN)
  @Post()
  @ApiOperation({ summary: 'Crear una nueva categoría (Solo para administradores)' })
  @ApiResponse({ status: 201, description: 'La categoría ha sido creada exitosamente.' })
  @ApiResponse({ status: 401, description: 'No autorizado.' })
  async create(@Body() createCategoryDto: CreateCategoryDto) {
    return this.categoryService.create(createCategoryDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  @ApiOperation({ summary: 'Obtener todas las categorías' })
  @ApiResponse({ status: 200, description: 'Lista de todas las categorías.' })
  @ApiResponse({ status: 401, description: 'No autorizado.' })
  async findAll() {
    return this.categoryService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  @ApiOperation({ summary: 'Obtener una categoría por su ID' })
  @ApiResponse({ status: 200, description: 'Categoría encontrada.' })
  @ApiResponse({ status: 404, description: 'Categoría no encontrada.' })
  @ApiResponse({ status: 401, description: 'No autorizado.' })
  async findById(@Param('id') id: string) {
    return this.categoryService.findById(id);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserType.ADMIN)
  @Put(':id')
  @ApiOperation({ summary: 'Actualizar una categoría por su ID (Solo para administradores)' })
  @ApiResponse({ status: 200, description: 'La categoría ha sido actualizada exitosamente.' })
  @ApiResponse({ status: 404, description: 'Categoría no encontrada.' })
  @ApiResponse({ status: 401, description: 'No autorizado.' })
  async updateById(@Param('id') id: string, @Body() updateCategoryDto: UpdateCategoryDto) {
    return this.categoryService.updateById(id, updateCategoryDto);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserType.ADMIN)
  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar una categoría por su ID (Solo para administradores)' })
  @ApiResponse({ status: 200, description: 'La categoría ha sido eliminada exitosamente.' })
  @ApiResponse({ status: 404, description: 'Categoría no encontrada.' })
  @ApiResponse({ status: 401, description: 'No autorizado.' })
  async deleteById(@Param('id') id: string) {
    return this.categoryService.deleteById(id);
  }
}
