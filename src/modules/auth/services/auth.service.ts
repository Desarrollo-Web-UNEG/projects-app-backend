import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService as PeopleAuthService } from '@people/services';
import { People } from '@people/entities/people.entity';
import { JwtAuthService } from '@auth/services/jwt.service';

/**
 * Servicio para la autenticación de usuarios
 * @description Maneja la validación de usuarios y autenticación
 */
@Injectable()
export class AuthService {
  constructor(
    private peopleAuthService: PeopleAuthService,
    private jwtAuthService: JwtAuthService,
  ) {}

  /**
   * Valida las credenciales de un usuario
   * @param email Email del usuario
   * @param password Contraseña del usuario
   */
  async validateUser(email: string, password: string): Promise<People> {
    const user = await this.peopleAuthService.validateUser(email, password);
    if (!user) {
      throw new UnauthorizedException('Credenciales inválidas');
    }
    return user;
  }

  /**
   * Autentica un usuario y genera un token JWT
   * @param user Usuario autenticado
   */
  async login(user: People) {
    return this.jwtAuthService.generateToken(user);
  }
} 