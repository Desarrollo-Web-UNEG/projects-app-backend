import { IsEmail, IsString, MinLength } from 'class-validator';

/**
 * DTO para la autenticación de usuarios
 */
export class LoginDto {
  @IsEmail()
  email: string;

  @IsString()
  @MinLength(6)
  password: string;
} 