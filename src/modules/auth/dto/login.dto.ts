import { IsEmail, IsString, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

/**
 * DTO para la autenticación de usuarios
 */
export class LoginDto {
  @IsEmail()
  @ApiProperty({ description: 'Correo electrónico del usuario', example: 'test@example.com' })
  email: string;

  @IsString()
  @MinLength(6)
  @ApiProperty({ description: 'Contraseña del usuario (mínimo 6 caracteres)', example: 'password123' })
  password: string;
} 