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

@Controller('projects')
export class ProjectController {
  constructor(private readonly projectService: ProjectService) {}

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserType.ADMIN)
  @Post()
  async create(@Body() createDto: CreateProjectDto, @Request() req) {
    return this.projectService.create(createDto, req.user.id);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  async findAll() {
    return this.projectService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async findById(@Param('id') id: number) {
    return this.projectService.findById(+id);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserType.ADMIN)
  @Put(':id')
  async update(@Param('id') id: number, @Body() updateDto: UpdateProjectDto, @Request() req) {
    return this.projectService.update(+id, updateDto, req.user.id);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserType.ADMIN)
  @Delete(':id')
    async delete(@Param('id') id: number) {
    return this.projectService.delete(+id);
  }
} 