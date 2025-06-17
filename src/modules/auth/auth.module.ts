import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthController } from '@auth/controllers/auth.controller';
import { AuthService, JwtAuthService } from '@auth/services';
import { JwtStrategy } from '@auth/strategies/jwt.strategy';
import { PeopleModule } from '@people/people.module';

@Module({
  imports: [
    PeopleModule,
    PassportModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'your-secret-key',
      signOptions: { expiresIn: '1d' },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtAuthService, JwtStrategy],
  exports: [AuthService, JwtAuthService],
})
export class AuthModule {} 