import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  UseGuards,
} from '@nestjs/common';
import { CategoryService } from '@category/services/category.service';
import { CreateCategoryDto, UpdateCategoryDto } from '@category/dto/category.dto';
import { JwtAuthGuard } from '@auth/guards/jwt-auth.guard';
import { RolesGuard } from '@auth/guards/roles.guard';
import { Roles } from '@auth/decorators/roles.decorator';
import { UserType } from '@people/entities';

@Controller('categories')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserType.ADMIN)
  @Post()
  async create(@Body() createCategoryDto: CreateCategoryDto) {
    return this.categoryService.create(createCategoryDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  async findAll() {
    return this.categoryService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async findById(@Param('id') id: string) {
    return this.categoryService.findById(id);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserType.ADMIN)
  @Put(':id')
  async updateById(@Param('id') id: string, @Body() updateCategoryDto: UpdateCategoryDto) {
    return this.categoryService.updateById(id, updateCategoryDto);
  }
}
