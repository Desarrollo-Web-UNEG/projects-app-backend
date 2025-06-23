import {
  IsString,
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsDateString,
  IsNumberString,
  MinLength,
  MaxLength,
  IsEnum,
} from 'class-validator';
import { UserType } from '@people/entities/people.entity';
import { PartialType, ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';

export class RegisterPeopleDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: 'Nombre de la persona', example: 'Juan' })
  name: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: 'Apellido de la persona', example: 'Pérez' })
  last_name: string;

  @IsString()
  @IsOptional()
  @ApiProperty({
    description: 'Dirección de la persona',
    example: 'Calle Falsa 123',
    required: false,
  })
  address?: string;

  @IsEnum(UserType)
  @IsNotEmpty()
  @ApiProperty({
    description: 'Tipo de usuario',
    enum: UserType,
    example: UserType.STUDENT,
  })
  user_type: UserType;

  @IsDateString()
  @IsOptional()
  @ApiProperty({
    description: 'Fecha de nacimiento (YYYY-MM-DD)',
    example: '1999-12-31',
    required: false,
  })
  birthdate?: string;

  @IsEmail()
  @Transform(({ value }) => value?.toLowerCase())
  @IsNotEmpty()
  @ApiProperty({
    description: 'Correo electrónico',
    example: 'juan.perez@example.com',
  })
  email: string;

  @IsNumberString()
  @IsOptional()
  @ApiProperty({
    description: 'Número de teléfono',
    example: '04121234567',
    required: false,
  })
  phone_number?: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(5)
  @MaxLength(20)
  @ApiProperty({ description: 'Cédula de identidad', example: '27123456' })
  id_number: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Pregunta de seguridad',
    example: '¿Nombre de mi primera mascota?',
  })
  security_question: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: 'Respuesta de seguridad', example: 'Firulais' })
  security_answer: string;

  @IsDateString()
  @IsOptional()
  @ApiProperty({
    description: 'Año de creación o ingreso (YYYY-MM-DD)',
    example: '2020-03-15',
    required: false,
  })
  year_of_creation?: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  @ApiProperty({
    description: 'Contraseña (mínimo 6 caracteres)',
    example: 'micontraseña123',
  })
  password: string;
}
//PartialType hace que tenga la misma estructura del registerPeopleDTO
//Pero hace que sean opcionales los atributos
export class UpdatePeopleDto extends PartialType(RegisterPeopleDto) {
  @IsEmail()
  @Transform(({ value }) => value?.toLowerCase())
  @IsOptional()
  email?: string;
}
