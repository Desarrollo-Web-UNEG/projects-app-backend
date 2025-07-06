import { Body, Controller, Post, UnauthorizedException } from '@nestjs/common';
import { AuthService } from '@auth/services/auth.service';
import { LoginDto } from '@auth/dto/login.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';

/**
 * Controlador para la autenticación de usuarios
 * @description Maneja las operaciones de login y validación de usuarios
 */
@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  /**
   * Autentica un usuario y genera un token JWT
   * @param loginDto Credenciales del usuario
   */
  @Post('login')
  @ApiOperation({ summary: 'Iniciar sesión para obtener un token de acceso' })
  @ApiBody({ type: LoginDto })
  @ApiResponse({ status: 201, description: 'Usuario autenticado exitosamente, devuelve token de acceso.' })
  @ApiResponse({ status: 401, description: 'Credenciales inválidas.' })
  async login(@Body() loginDto: LoginDto) {
    try {
      const user = await this.authService.validateUser(
        loginDto.email,
        loginDto.password,
      );
      return this.authService.login(user);
    } catch (error) {
      if (error instanceof UnauthorizedException) {
        throw new UnauthorizedException(error.message);
      }
      throw error;
    }
  }
} 