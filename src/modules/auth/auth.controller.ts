import { Body, Controller, Post, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { PeopleService } from '../people/people.service';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private peopleService: PeopleService,
  ) {}

  @Post('login')
  async login(@Body() loginDto: { email: string; password: string }) {
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