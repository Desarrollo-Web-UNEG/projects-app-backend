import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from '../services';
import { RegisterPeopleDto } from '../dto/register-people.dto';

/**
 * Controlador para la autenticación y registro de usuarios
 * @description Maneja las operaciones de registro y autenticación
 */
@Controller('people/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  /**
   * Registra un nuevo usuario
   * @param registerDto Datos del usuario a registrar
   */
  @Post('register')
  async register(@Body() registerDto: RegisterPeopleDto) {
    return this.authService.register(registerDto);
  }
} 