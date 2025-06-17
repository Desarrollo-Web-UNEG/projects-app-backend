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

@Controller('academic-periods')
export class AcademicPeriodController {
  constructor(private readonly academicPeriodService: AcademicPeriodService) {}

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserType.ADMIN)
  @Post()
  async create(@Body() createDto: CreateAcademicPeriodDto) {
    return this.academicPeriodService.create(createDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  async findAll() {
    return this.academicPeriodService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async findById(@Param('id') id: string) {
    return this.academicPeriodService.findOne(+id);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserType.ADMIN)
  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateDto: UpdateAcademicPeriodDto,
  ) {
    return this.academicPeriodService.update(+id, updateDto);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserType.ADMIN)
  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.academicPeriodService.remove(+id);
  }
}
