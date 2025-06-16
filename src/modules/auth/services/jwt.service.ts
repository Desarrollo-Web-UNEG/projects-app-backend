import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { People } from '../../people/entities';

/**
 * Servicio para el manejo de tokens JWT
 * @description Maneja la generación y validación de tokens JWT
 */
@Injectable()
export class JwtAuthService {
  constructor(private jwtService: JwtService) {}

  /**
   * Genera un token JWT y devuelve la información del usuario
   * @param user Usuario autenticado
   */
  async generateToken(user: People) {
    const payload = {
      email: user.email,
      sub: user.id,
      user_type: user.user_type,
    };

    return {
      access_token: this.jwtService.sign(payload),
      user: {
        id: user.id,
        name: user.name,
        last_name: user.last_name,
        email: user.email,
        user_type: user.user_type,
        status: user.status,
        address: user.address,
        birthdate: user.birthdate,
        phone_number: user.phone_number,
        id_number: user.id_number,
        security_question: user.security_question,
        year_of_creation: user.year_of_creation,
      },
    };
  }
} 