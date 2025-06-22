import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AuthController } from '@people/controllers/auth.controller';
import { AuthService } from '@people/services';
import { RegisterPeopleDto } from '@people/dto/register-people.dto';
import { UserType } from '@people/entities/people.entity';

describe('AuthController', () => {
  let app: INestApplication;
  let authService: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        {
          provide: AuthService,
          useValue: {
            register: jest.fn(),
          },
        },
      ],
    }).compile();

    app = module.createNestApplication();
    await app.init();
    authService = module.get<AuthService>(AuthService);
  });

  afterEach(async () => {
    await app.close();
  });

  it('should register a new user', async () => {
    const registerDto: RegisterPeopleDto = {
      email: 'test@example.com',
      password: 'password123',
      name: 'Test User',
      last_name: 'Test Lastname',
      birthdate: new Date().toISOString(),
      id_number: '123456789',
      phone_number: '123456789',
      address: 'Test Address',
      user_type: UserType.STUDENT,
      security_question: 'What is your favorite color?',
      security_answer: 'Blue',
    };

    jest.spyOn(authService, 'register').mockResolvedValue({
      id: 'some-uuid',
      email: registerDto.email,
      name: registerDto.name,
      last_name: registerDto.last_name,
      user_type: registerDto.user_type,
      security_question: registerDto.security_question,
      security_answer: registerDto.security_answer,
    } as any); // Mock the return value of register

    const response = await request(app.getHttpServer())
      .post('/people/auth/register')
      .send(registerDto)
      .expect(201);

    expect(authService.register).toHaveBeenCalledWith(registerDto);
    expect(response.body).toEqual({
      id: 'some-uuid',
      email: registerDto.email,
      name: registerDto.name,
      last_name: registerDto.last_name,
      user_type: registerDto.user_type,
      security_question: registerDto.security_question,
      security_answer: registerDto.security_answer,
    });
  });
});
