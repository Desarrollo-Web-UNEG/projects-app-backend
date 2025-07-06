import {
  Controller,
  Get,
  Post,
  Delete,
  Param,
  UseGuards,
} from '@nestjs/common';
import { AdminService } from '@people/services';
import { JwtAuthGuard } from '@auth/guards/jwt-auth.guard';
import { RolesGuard } from '@auth/guards/roles.guard';
import { Roles } from '@auth/decorators/roles.decorator';
import { UserType } from '@people/entities/people.entity';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

/**
 * Controlador para operaciones administrativas de usuarios
 * @description Maneja todas las operaciones que requieren permisos de administrador
 */
@ApiTags('People (Admin)')
@Controller('people/admin')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(UserType.ADMIN)
export class AdminController {
  constructor(private readonly peopleService: AdminService) {}

  /**
   * Obtiene todos los usuarios
   */
  @Get()
  @ApiOperation({ summary: 'Obtener todos los usuarios (Solo para Admin)' })
  @ApiResponse({ status: 200, description: 'Lista de todos los usuarios.' })
  @ApiResponse({ status: 401, description: 'No autorizado.' })
  @ApiResponse({ status: 403, description: 'Acceso denegado (no es admin).' })
  async getAllUsers() {
    return this.peopleService.getAllUsers();
  }

  /**
   * Obtiene usuarios pendientes de aprobación
   */
  @Get('pending')
  @ApiOperation({
    summary: 'Obtener usuarios pendientes de aprobación (Solo para Admin)',
  })
  @ApiResponse({ status: 200, description: 'Lista de usuarios pendientes.' })
  @ApiResponse({ status: 401, description: 'No autorizado.' })
  @ApiResponse({ status: 403, description: 'Acceso denegado (no es admin).' })
  async getPendingUsers() {
    return this.peopleService.getPendingUsers();
  }

  /**
   * Aprueba un usuario pendiente
   * @param id ID del usuario a aprobar
   */
  @Post(':id/approve')
  @ApiOperation({ summary: 'Aprobar un usuario pendiente (Solo para Admin)' })
  @ApiResponse({ status: 200, description: 'Usuario aprobado.' })
  @ApiResponse({ status: 404, description: 'Usuario no encontrado.' })
  @ApiResponse({ status: 401, description: 'No autorizado.' })
  async approveUser(@Param('id') id: string) {
    return this.peopleService.approveUser(id);
  }

  /**
   * Rechaza un usuario pendiente
   * @param id ID del usuario a rechazar
   */
  @Post(':id/reject')
  @ApiOperation({ summary: 'Rechazar un usuario pendiente (Solo para Admin)' })
  @ApiResponse({ status: 200, description: 'Usuario rechazado.' })
  @ApiResponse({ status: 404, description: 'Usuario no encontrado.' })
  @ApiResponse({ status: 401, description: 'No autorizado.' })
  async rejectUser(@Param('id') id: string) {
    return this.peopleService.rejectUser(id);
  }

  /**
   * Actualiza un usuario existente
   * @param id ID del usuario a actualizar
   * @param changes Cambios a aplicar
   */
  // @Put(':id')
  // @ApiOperation({ summary: 'Actualizar un usuario por su ID (Solo para Admin)' })
  // @ApiBody({ type: UpdatePeopleDto })
  // @ApiResponse({ status: 200, description: 'Usuario actualizado.' })
  // @ApiResponse({ status: 404, description: 'Usuario no encontrado.' })
  // @ApiResponse({ status: 401, description: 'No autorizado.' })
  // async updateById(@Param('id') id: string, @Body() changes: UpdatePeopleDto) {
  //   return this.peopleService.updateUser(id, changes);
  // }

  /**
   * Elimina un usuario
   * @param id ID del usuario a eliminar
   */
  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar un usuario por su ID (Solo para Admin)' })
  @ApiResponse({ status: 200, description: 'Usuario eliminado.' })
  @ApiResponse({ status: 404, description: 'Usuario no encontrado.' })
  @ApiResponse({ status: 401, description: 'No autorizado.' })
  async deleteById(@Param('id') id: string) {
    return this.peopleService.deleteUser(id);
  }
}
