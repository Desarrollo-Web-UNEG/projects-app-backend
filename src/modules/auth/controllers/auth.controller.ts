import { Body, Controller, Post, UnauthorizedException } from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { LoginDto } from '../dto/login.dto';

/**
 * Controlador para la autenticación de usuarios
 * @description Maneja las operaciones de login y validación de usuarios
 */
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  /**
   * Autentica un usuario y genera un token JWT
   * @param loginDto Credenciales del usuario
   */
  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    try {
      const user = await this.authService.validateUser(
        loginDto.email,
        loginDto.password,
      );
      return this.authService.login(user);
    } catch (error) {
      throw new UnauthorizedException('Credenciales inválidas');
    }
  }
} 