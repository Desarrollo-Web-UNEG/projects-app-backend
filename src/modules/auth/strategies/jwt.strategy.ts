import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { AuthService as PeopleService } from '../../people/services';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private peopleService: PeopleService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET || 'tu_clave_secreta_super_segura',
    });
  }

  async validate(payload: any) {
    const user = await this.peopleService.findByEmail(payload.email);
    return user;
  }
} 