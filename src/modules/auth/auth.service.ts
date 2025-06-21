import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PeopleService } from '../people/people.service';
import { People, UserType } from '../people/entities/people.entity';

@Injectable()
export class AuthService {
  constructor(
    private peopleService: PeopleService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<People> {
    const user = await this.peopleService.validateUser(email, password);
    if (!user) {
      throw new UnauthorizedException('Credenciales inválidas');
    }
    return user;
  }

  async login(user: People) {
    const payload = { 
      email: user.email, 
      sub: user.id, 
      user_type: user.user_type 
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
        year_of_creation: user.year_of_creation
      },
    };
  }
} 