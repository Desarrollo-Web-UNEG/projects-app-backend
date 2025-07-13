import {
  Controller,
  Get,
  Param,
  UseGuards,
  Request,
  Put,
  Body,
} from '@nestjs/common';
import { ProfileService } from '@people/services';
import { JwtAuthGuard } from '@auth/guards/jwt-auth.guard';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
  ApiBody,
} from '@nestjs/swagger';
import { UpdatePeopleDto } from '@people/dto/register-people.dto';

/**
 * Controlador para la gestión de perfiles de usuario
 * @description Maneja las operaciones relacionadas con perfiles de usuario
 */
@ApiTags('People (Profile)')
@ApiBearerAuth()
@Controller('people/profile')
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

  /**
   * Obtiene el perfil del usuario autenticado
   * @param req Request con la información del usuario
   */
  @UseGuards(JwtAuthGuard)
  @Get('me')
  @ApiOperation({
    summary: 'Obtener el perfil del usuario autenticado actualmente',
  })
  @ApiResponse({ status: 200, description: 'Perfil del usuario.' })
  @ApiResponse({ status: 401, description: 'No autorizado.' })
  async getProfile(@Request() req) {
    return req.user;
  }

  /**
   * Obtiene un usuario por su email
   * @param email Email del usuario a buscar
   */
  @UseGuards(JwtAuthGuard)
  @Get('email/:email')
  @ApiOperation({ summary: 'Obtener el perfil de un usuario por su email' })
  @ApiResponse({ status: 200, description: 'Perfil del usuario encontrado.' })
  @ApiResponse({ status: 404, description: 'Usuario no encontrado.' })
  @ApiResponse({ status: 401, description: 'No autorizado.' })
  async getByEmail(@Param('email') email: string) {
    return this.profileService.findByEmail(email);
  }

  /**
   * Obtiene un usuario por su cedula
   * @param id_number Cedula del usuario a buscar
   */
  @UseGuards(JwtAuthGuard)
  @Get('cedula/:id_number')
  @ApiOperation({ summary: 'Obtener el perfil de un usuario por su cedula' })
  @ApiResponse({ status: 200, description: 'Perfil del usuario encontrado.' })
  @ApiResponse({ status: 404, description: 'Usuario no encontrado.' })
  @ApiResponse({ status: 401, description: 'No autorizado.' })
  async getByCedula(@Param('id_number') id_number: string) {
    return this.profileService.findByCedula(id_number);
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  @ApiOperation({
    summary: 'Actualizar un usuario por su ID (Solo para Admin)',
  })
  @ApiBody({ type: UpdatePeopleDto })
  @ApiResponse({ status: 200, description: 'Usuario actualizado.' })
  @ApiResponse({ status: 404, description: 'Usuario no encontrado.' })
  @ApiResponse({ status: 401, description: 'No autorizado.' })
  async updateById(@Param('id') id: string, @Body() changes: UpdatePeopleDto) {
    return this.profileService.updateUser(id, changes);
  }

  /**
   * Obtiene estudiantes aprobados
   */
  @Get('approved')
  @ApiOperation({
    summary: 'Obtener usuarios pendientes de aprobación (Solo para Admin)',
  })
  @ApiResponse({ status: 200, description: 'Lista de usuarios pendientes.' })
  @ApiResponse({ status: 401, description: 'No autorizado.' })
  @ApiResponse({ status: 403, description: 'Acceso denegado (no es admin).' })
  async getApprovedStudents() {
    return this.profileService.getApprovedStudents();
  }
}
