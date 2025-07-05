import {
  Injectable,
  BadRequestException,
  InternalServerErrorException,
} from '@nestjs/common';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { ChatMessageDto, ChatResponseDto } from '@IA/dto/chat.dto';

/**
 * Servicio para la gestión de IA con Gemini
 */
@Injectable()
export class AiService {
  private genAI: GoogleGenerativeAI;
  private model: any;
  private readonly ACADEMIC_PROMPT_BASE = `
    Eres un asistente académico especializado. Tu función es respountas relacionadas con temas académicos, educativos, científicos y de aprendizaje.nder ÚNICAMENTE preg

    REGLAS IMPORTANTES:
    1. SOLO responde preguntas académicas, educativas o científicas
    2. Si la pregunta NO es académica, responde: "Lo siento, solo puedo responder preguntas académicas y educativas. ¿Puedes hacer una pregunta relacionada con tus estudios o temas académicos?"
    3. SIEMPRE proporciona respuestas precisas y basadas en hechos verificables
    4. Si no estás seguro de algo, indícalo claramente
    5. Usa un tono profesional pero accesible
    6. Proporciona ejemplos cuando sea apropiado
    7. Cita fuentes cuando sea posible

    Temas que SÍ puedes abordar:
    - Matemáticas, física, química, biología
    - Programación, informática, tecnología
    - Historia, geografía, literatura
    - Filosofía, psicología, sociología
    - Idiomas y lingüística
    - Artes, música, arquitectura
    - Economía, administración, derecho
    - Medicina, salud, nutrición
    - Cualquier tema de estudio universitario o escolar

    Temas que NO debes abordar:
    - Chistes, entretenimiento no educativo
    - Consejos personales no académicos
    - Política partidista
    - Religión (excepto desde perspectiva académica)
    - Temas de salud mental personal
    - Cualquier tema no relacionado con educación o ciencia
  `;

  constructor() {
    // Inicializar Gemini AI
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      throw new Error(
        'GEMINI_API_KEY no está configurada en las variables de entorno',
      );
    }

    this.genAI = new GoogleGenerativeAI(apiKey);
    this.model = this.genAI.getGenerativeModel({ model: 'gemini-pro' });
  }

  /**
   * Valida si el mensaje es académico
   * @param message Mensaje del usuario
   * @returns true si es académico, false en caso contrario
   */
  private isAcademicMessage(message: string): boolean {
    const academicKeywords = [
      // Ciencias exactas
      'matemática',
      'física',
      'química',
      'biología',
      'álgebra',
      'cálculo',
      'geometría',
      'programación',
      'algoritmo',
      'código',
      'software',
      'hardware',
      'base de datos',
      'estadística',
      'probabilidad',
      'análisis',
      'investigación',
      'método científico',

      // Ciencias sociales
      'historia',
      'geografía',
      'filosofía',
      'psicología',
      'sociología',
      'economía',
      'política',
      'derecho',
      'administración',
      'contabilidad',
      'marketing',

      // Humanidades
      'literatura',
      'idioma',
      'lingüística',
      'arte',
      'música',
      'arquitectura',
      'teatro',
      'cine',
      'fotografía',
      'diseño',

      // Ciencias de la salud
      'medicina',
      'anatomía',
      'fisiología',
      'nutrición',
      'salud',
      'enfermedad',
      'tratamiento',
      'diagnóstico',
      'prevención',

      // Educación
      'estudiar',
      'aprender',
      'enseñar',
      'educación',
      'universidad',
      'escuela',
      'curso',
      'materia',
      'asignatura',
      'tema',
      'concepto',
      'teoría',
      'práctica',
      'examen',
      'evaluación',
      'proyecto',
      'investigación',
      'trabajo académico',

      // Preguntas académicas
      '¿qué es',
      '¿cómo funciona',
      '¿por qué',
      '¿cuándo',
      '¿dónde',
      '¿quién',
      'explicar',
      'definir',
      'describir',
      'comparar',
      'analizar',
      'evaluar',
      'diferencias',
      'similitudes',
      'ventajas',
      'desventajas',
      'beneficios',
      'aplicaciones',
      'ejemplos',
      'casos de uso',
    ];

    const lowerMessage = message.toLowerCase();
    return academicKeywords.some((keyword) => lowerMessage.includes(keyword));
  }

  /**
   * Procesa un mensaje del chat y genera una respuesta académica
   * @param chatMessageDto Datos del mensaje del usuario
   * @returns Respuesta del chatbot
   */
  async processChatMessage(
    chatMessageDto: ChatMessageDto,
  ): Promise<ChatResponseDto> {
    try {
      const { message, context } = chatMessageDto;

      // Validar que el mensaje no esté vacío
      if (!message || message.trim().length === 0) {
        throw new BadRequestException('El mensaje no puede estar vacío');
      }

      // Verificar si el mensaje es académico
      const isAcademic = this.isAcademicMessage(message);

      if (!isAcademic) {
        return {
          response:
            'Lo siento, solo puedo responder preguntas académicas y educativas. ¿Puedes hacer una pregunta relacionada con tus estudios o temas académicos?',
          isValid: false,
          timestamp: new Date().toISOString(),
        };
      }

      // Construir el prompt completo
      let fullPrompt = this.ACADEMIC_PROMPT_BASE;

      if (context) {
        fullPrompt += `\n\nContexto adicional del usuario: ${context}`;
      }

      fullPrompt += `\n\nPregunta del usuario: ${message}`;
      fullPrompt += `\n\nResponde de manera clara, precisa y académicamente correcta.`;

      // Generar respuesta con Gemini
      const result = await this.model.generateContent(fullPrompt);
      const response = await result.response;
      const text = response.text();

      // Validar que la respuesta no esté vacía
      if (!text || text.trim().length === 0) {
        throw new InternalServerErrorException(
          'No se pudo generar una respuesta válida',
        );
      }

      return {
        response: text.trim(),
        isValid: true,
        timestamp: new Date().toISOString(),
      };
    } catch (error) {
      if (
        error instanceof BadRequestException ||
        error instanceof InternalServerErrorException
      ) {
        throw error;
      }

      // Manejar errores de la API de Gemini
      console.error('Error al procesar mensaje con Gemini:', error);
      throw new InternalServerErrorException(
        'Error al procesar tu mensaje. Por favor, intenta de nuevo.',
      );
    }
  }

  /**
   * Obtiene información sobre el estado del servicio
   * @returns Información del servicio
   */
  async getServiceInfo(): Promise<{
    status: string;
    model: string;
    academicFocus: boolean;
  }> {
    return {
      status: 'active',
      model: 'gemini-pro',
      academicFocus: true,
    };
  }
}
