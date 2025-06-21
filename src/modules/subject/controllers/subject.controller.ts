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
import { SubjectService } from '@subject/services/subject.service';
import { CreateSubjectDto, UpdateSubjectDto } from '@subject/dto/subject.dto';
import { JwtAuthGuard } from '@auth/guards/jwt-auth.guard';
import { RolesGuard } from '@auth/guards/roles.guard';
import { Roles } from '@auth/decorators/roles.decorator';
import { UserType } from '@people/entities/people.entity';

@Controller('subjects')
export class SubjectController {
  constructor(private readonly subjectService: SubjectService) {}

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserType.ADMIN)
  @Post()
  async create(@Body() createSubject: CreateSubjectDto) {
    return this.subjectService.create(createSubject);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  async findAll() {
    return this.subjectService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async findbyId(@Param('id') id: number) {
    return this.subjectService.findById(id);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserType.ADMIN)
  @Put(':id')
  async updateById(@Param('id') id: number, @Body() changes: UpdateSubjectDto) {
    return this.subjectService.updateById(id, changes);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserType.ADMIN)
  @Delete(':id')
  async deleteById(@Param('id') id: number) {
    return this.subjectService.deleteById(id);
  }
}
