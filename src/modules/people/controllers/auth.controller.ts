import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from '@people/services';
import { RegisterPeopleDto } from '@people/dto/register-people.dto';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

/**
 * Controlador para la autenticación y registro de usuarios
 * @description Maneja las operaciones de registro y autenticación
 */
@ApiTags('People')
@Controller('people/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  /**
   * Registra un nuevo usuario
   * @param registerDto Datos del usuario a registrar
   */
  @Post('register')
  @ApiOperation({ summary: 'Registrar una nueva persona (estudiante, profesor, etc.)' })
  @ApiResponse({ status: 201, description: 'La persona ha sido registrada exitosamente.' })
  @ApiResponse({ status: 400, description: 'Datos inválidos o el usuario ya existe.' })
  async register(@Body() registerDto: RegisterPeopleDto) {
    return this.authService.register(registerDto);
  }
} 