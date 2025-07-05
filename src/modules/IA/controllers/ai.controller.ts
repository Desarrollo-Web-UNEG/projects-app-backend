import {
  Controller,
  Post,
  Get,
  Body,
  UseGuards,
  Request,
} from '@nestjs/common';
import { AiService } from '@IA/services/ai.service';
import { ChatMessageDto, ChatResponseDto } from '@IA/dto/chat.dto';
import { JwtAuthGuard } from '@auth/guards/jwt-auth.guard';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
} from '@nestjs/swagger';

@ApiTags('AI Chatbot Académico')
@ApiBearerAuth()
@Controller('ai')
export class AiController {
  constructor(private readonly aiService: AiService) {}

  @UseGuards(JwtAuthGuard)
  @Post('chat')
  @ApiOperation({
    summary: 'Enviar mensaje al chatbot académico',
    description:
      'Procesa un mensaje del usuario y genera una respuesta académica usando Gemini AI',
  })
  @ApiResponse({
    status: 201,
    description: 'Respuesta del chatbot generada exitosamente.',
    type: ChatResponseDto,
  })
  @ApiResponse({
    status: 400,
    description: 'Mensaje vacío o no válido.',
  })
  @ApiResponse({
    status: 401,
    description: 'No autorizado.',
  })
  @ApiResponse({
    status: 500,
    description: 'Error interno del servidor.',
  })
  async sendMessage(
    @Body() chatMessageDto: ChatMessageDto,
    @Request() req,
  ): Promise<ChatResponseDto> {
    return this.aiService.processChatMessage(chatMessageDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get('info')
  @ApiOperation({
    summary: 'Obtener información del servicio de IA',
    description:
      'Retorna información sobre el estado y configuración del servicio de IA',
  })
  @ApiResponse({
    status: 200,
    description: 'Información del servicio obtenida exitosamente.',
  })
  @ApiResponse({
    status: 401,
    description: 'No autorizado.',
  })
  async getServiceInfo() {
    return this.aiService.getServiceInfo();
  }

  @UseGuards(JwtAuthGuard)
  @Post('chat/academic-validation')
  @ApiOperation({
    summary: 'Validar si un mensaje es académico',
    description:
      'Verifica si un mensaje dado es considerado académico sin generar respuesta',
  })
  @ApiResponse({
    status: 200,
    description: 'Validación completada.',
  })
  @ApiResponse({
    status: 401,
    description: 'No autorizado.',
  })
  async validateAcademicMessage(@Body() chatMessageDto: ChatMessageDto) {
    const { message } = chatMessageDto;

    // Usar el método privado del servicio para validación
    const isValid = this['aiService']['isAcademicMessage'](message);

    return {
      message,
      isAcademic: isValid,
      timestamp: new Date().toISOString(),
    };
  }
}
