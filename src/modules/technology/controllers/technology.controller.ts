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

@Controller('technology')
export class TechnologyController {
  constructor(private readonly technologyService: TechnologyService) {}

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserType.ADMIN)
  @Post()
  async create(@Body() create: CreateTechnologyDto) {
    return this.technologyService.create(create);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  async findAll() {
    return this.technologyService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async findbyId(@Param('id') id: number) {
    return this.technologyService.findById(id);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserType.ADMIN)
  @Put(':id')
  async updateById(
    @Param('id') id: number,
    @Body() changes: UpdateTechnologyDto,
  ) {
    return this.technologyService.updateById(id, changes);
  }
}
