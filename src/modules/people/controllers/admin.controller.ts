import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  UseGuards,
} from '@nestjs/common';
import { AdminService } from '../services';
import { UpdatePeopleDto } from '../dto/register-people.dto';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../../auth/guards/roles.guard';
import { Roles } from '../../auth/decorators/roles.decorator';
import { UserType } from '../entities';

/**
 * Controlador para operaciones administrativas de usuarios
 * @description Maneja todas las operaciones que requieren permisos de administrador
 */
@Controller('people/admin')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(UserType.ADMIN)
export class AdminController {
  constructor(private readonly peopleService: AdminService) {}

  /**
   * Obtiene todos los usuarios
   */
  @Get()
  async getAllUsers() {
    return this.peopleService.getAllUsers();
  }

  /**
   * Obtiene usuarios pendientes de aprobación
   */
  @Get('pending')
  async getPendingUsers() {
    return this.peopleService.getPendingUsers();
  }

  /**
   * Aprueba un usuario pendiente
   * @param id ID del usuario a aprobar
   */
  @Post(':id/approve')
  async approveUser(@Param('id') id: string) {
    return this.peopleService.approveUser(id);
  }

  /**
   * Rechaza un usuario pendiente
   * @param id ID del usuario a rechazar
   */
  @Post(':id/reject')
  async rejectUser(@Param('id') id: string) {
    return this.peopleService.rejectUser(id);
  }

  /**
   * Actualiza un usuario existente
   * @param id ID del usuario a actualizar
   * @param changes Cambios a aplicar
   */
  @Put(':id')
  async updateById(@Param('id') id: string, @Body() changes: UpdatePeopleDto) {
    return this.peopleService.updateUser(id, changes);
  }

  /**
   * Elimina un usuario
   * @param id ID del usuario a eliminar
   */
  @Delete(':id')
  async deleteById(@Param('id') id: string) {
    return this.peopleService.deleteUser(id);
  }
} 