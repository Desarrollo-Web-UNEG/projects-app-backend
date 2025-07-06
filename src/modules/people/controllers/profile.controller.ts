import { Controller, Get, Param, UseGuards, Request } from '@nestjs/common';
import { ProfileService } from '@people/services';
import { JwtAuthGuard } from '@auth/guards/jwt-auth.guard';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';

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
  @ApiOperation({ summary: 'Obtener el perfil del usuario autenticado actualmente' })
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
} 