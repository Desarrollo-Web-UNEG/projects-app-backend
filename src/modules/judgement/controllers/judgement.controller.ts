import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  UseGuards,
} from '@nestjs/common';
import { JudgementService } from '@judgement/services/judgement.service';
import { CreateJudgementDto } from '@judgement/dto/create-judgement.dto';
import { Judgement } from '@judgement/entities/judgement.entity';
import { ApiTags, ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';
import { JwtAuthGuard } from '@auth/guards/jwt-auth.guard';
import { RolesGuard } from '@auth/guards/roles.guard';
import { Roles } from '@auth/decorators/roles.decorator';
import { UserType } from '@people/entities';
import { PartialType } from '@nestjs/swagger';

class UpdateJudgementDto extends PartialType(CreateJudgementDto) {}

@ApiTags('Judgements')
@Controller('judgements')
@UseGuards(JwtAuthGuard)
export class JudgementController {
  constructor(private readonly judgementService: JudgementService) {}

  @Post()
  @Roles(UserType.ADMIN)
  @UseGuards(RolesGuard)
  @ApiOperation({ summary: 'Crear un nuevo criterio de evaluación (Solo para Admin)' })
  @ApiResponse({ status: 201, description: 'Criterio creado.' })
  @ApiResponse({ status: 401, description: 'No autorizado.' })
  create(@Body() createJudgementDto: CreateJudgementDto): Promise<Judgement> {
    return this.judgementService.create(createJudgementDto);
  }

  @Get()
  @ApiOperation({ summary: 'Obtener todos los criterios de evaluación' })
  @ApiResponse({ status: 200, description: 'Lista de criterios.' })
  @ApiResponse({ status: 401, description: 'No autorizado.' })
  findAll(): Promise<Judgement[]> {
    return this.judgementService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener un criterio por su ID' })
  @ApiResponse({ status: 200, description: 'Criterio encontrado.' })
  @ApiResponse({ status: 404, description: 'Criterio no encontrado.' })
  @ApiResponse({ status: 401, description: 'No autorizado.' })
  findOne(@Param('id') id: number): Promise<Judgement> {
    return this.judgementService.findOne(+id);
  }

  @Put(':id')
  @Roles(UserType.ADMIN)
  @UseGuards(RolesGuard)
  @ApiOperation({ summary: 'Actualizar un criterio por su ID (Solo para Admin)' })
  @ApiBody({ type: UpdateJudgementDto })
  @ApiResponse({ status: 200, description: 'Criterio actualizado.' })
  @ApiResponse({ status: 404, description: 'Criterio no encontrado.' })
  @ApiResponse({ status: 401, description: 'No autorizado.' })
  update(
    @Param('id') id: number,
    @Body() updateJudgementDto: UpdateJudgementDto,
  ): Promise<Judgement | null> {
    return this.judgementService.update(+id, updateJudgementDto);
  }

  @Delete(':id')
  @Roles(UserType.ADMIN)
  @UseGuards(RolesGuard)
  @ApiOperation({ summary: 'Eliminar un criterio por su ID (Solo para Admin)' })
  @ApiResponse({ status: 200, description: 'Criterio eliminado.' })
  @ApiResponse({ status: 404, description: 'Criterio no encontrado.' })
  @ApiResponse({ status: 401, description: 'No autorizado.' })
  remove(@Param('id') id: number): Promise<void> {
    return this.judgementService.remove(+id);
  }
} 