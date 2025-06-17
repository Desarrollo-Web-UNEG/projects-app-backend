import { Controller, Get, Param, UseGuards, Request } from '@nestjs/common';
import { ProfileService } from '@people/services';
import { JwtAuthGuard } from '@auth/guards/jwt-auth.guard';

/**
 * Controlador para la gestión de perfiles de usuario
 * @description Maneja las operaciones relacionadas con perfiles de usuario
 */
@Controller('people/profile')
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

  /**
   * Obtiene el perfil del usuario autenticado
   * @param req Request con la información del usuario
   */
  @UseGuards(JwtAuthGuard)
  @Get('me')
  async getProfile(@Request() req) {
    return req.user;
  }

  /**
   * Obtiene un usuario por su email
   * @param email Email del usuario a buscar
   */
  @UseGuards(JwtAuthGuard)
  @Get('email/:email')
  async getByEmail(@Param('email') email: string) {
    return this.profileService.findByEmail(email);
  }
} 