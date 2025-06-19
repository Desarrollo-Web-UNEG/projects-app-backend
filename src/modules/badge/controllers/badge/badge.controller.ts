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

@Controller('badge')
export class BadgeController {
  constructor(private readonly badgeService: BadgeService) {}

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserType.ADMIN)
  @Post()
  async create(@Body() create: CreateBadgeDto) {
    return this.badgeService.create(create);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  async findAll() {
    return this.badgeService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async findbyId(@Param('id') id: number) {
    return this.badgeService.findById(id);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserType.ADMIN)
  @Put(':id')
  async updateById(@Param('id') id: number, @Body() changes: UpdateBadgeDto) {
    return this.badgeService.updateById(id, changes);
  }
}
