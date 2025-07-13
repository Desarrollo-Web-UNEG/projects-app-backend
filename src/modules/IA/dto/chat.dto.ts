import { IsString, IsNotEmpty, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ChatMessageDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Mensaje del usuario para el chatbot académico',
    example:
      '¿Cuáles son los principios fundamentales de la programación orientada a objetos?',
    minLength: 1,
    maxLength: 1000,
  })
  message: string;

  @IsString()
  @IsOptional()
  @ApiProperty({
    description: 'Contexto adicional para la conversación (opcional)',
    example: 'Estoy estudiando Java en mi curso de programación',
    required: false,
  })
  context?: string;
}

export class ChatResponseDto {
  @ApiProperty({
    description: 'Respuesta del chatbot académico',
    example:
      'Los principios fundamentales de la POO son: Encapsulación, Herencia, Polimorfismo y Abstracción...',
  })
  response: string;

  @ApiProperty({
    description: 'Indica si la respuesta es académicamente válida',
    example: true,
  })
  isValid: boolean;

  @ApiProperty({
    description: 'Timestamp de la respuesta',
    example: '2024-01-15T10:30:00Z',
  })
  timestamp: string;
}
