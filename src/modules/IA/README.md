# Módulo de IA - Chatbot Académico

Este módulo proporciona un chatbot académico basado en Google Gemini AI que responde únicamente preguntas relacionadas con temas educativos y científicos.

## Configuración

### Variables de Entorno

Agrega las siguientes variables de entorno a tu archivo `.env`:

```env
# API Key de Google Gemini AI (requerida)
GEMINI_API_KEY=tu_api_key_de_gemini_aqui

# Modelo de Gemini a usar (opcional, por defecto: gemini-1.5-flash - GRATUITO)
GEMINI_MODEL=gemini-1.5-flash
```

### Modelos Disponibles

- `gemini-1.5-flash`: **Modelo gratuito** - Rápido y eficiente para la mayoría de casos de uso (recomendado)
- `gemini-1.5-pro`: Modelo de pago - Más potente para tareas complejas
- `gemini-pro`: Modelo anterior (puede no estar disponible en todas las regiones)

Para obtener una API key de Gemini:

1. Ve a [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Crea una nueva API key (es gratuita)
3. Copia la key y agrégala a tu archivo `.env`

### Modelo Gratuito

El servicio está configurado para usar `gemini-1.5-flash` por defecto, que es **completamente gratuito** y ofrece:

- Respuestas rápidas y precisas
- Cuota generosa para uso académico
- Soporte completo para español
- Ideal para preguntas y respuestas educativas

## Endpoints Disponibles

### POST `/ai/chat`

Envía un mensaje al chatbot académico.

**Body:**

```json
{
  "message": "¿Cuáles son los principios de la programación orientada a objetos?",
  "context": "Estoy estudiando Java en mi curso de programación"
}
```

**Response:**

```json
{
  "response": "Los principios fundamentales de la POO son...",
  "isValid": true,
  "timestamp": "2024-01-15T10:30:00Z"
}
```

### GET `/ai/info`

Obtiene información sobre el estado del servicio.

**Response:**

```json
{
  "status": "active",
  "model": "gemini-1.5-flash",
  "academicFocus": true,
  "connectionStatus": true
}
```

### POST `/ai/chat/academic-validation`

Valida si un mensaje es considerado académico sin generar respuesta.

**Body:**

```json
{
  "message": "¿Cuál es la capital de Francia?"
}
```

**Response:**

```json
{
  "message": "¿Cuál es la capital de Francia?",
  "isAcademic": true,
  "timestamp": "2024-01-15T10:30:00Z"
}
```

## Características

### Prompt Base Académico

El chatbot está configurado con un prompt base que:

- Solo responde preguntas académicas y educativas
- Rechaza preguntas no relacionadas con estudios
- Proporciona respuestas precisas y verificables
- Usa un tono profesional pero accesible

### Temas Cubiertos

- Ciencias exactas (matemáticas, física, química, etc.)
- Programación e informática
- Ciencias sociales (historia, geografía, etc.)
- Humanidades (literatura, arte, etc.)
- Ciencias de la salud
- Cualquier tema de estudio universitario o escolar

### Validación de Mensajes

El sistema incluye validación automática que detecta si un mensaje es académico basándose en palabras clave y contexto.

## Autenticación

Todos los endpoints requieren autenticación JWT. Incluye el token en el header:

```
Authorization: Bearer tu_token_jwt
```

## Manejo de Errores

- **400**: Mensaje vacío o no válido
- **401**: No autorizado
- **500**: Error interno del servidor o problema con la API de Gemini

### Errores Comunes

1. **404 Not Found - Modelo no encontrado**:

   - Verifica que el modelo especificado en `GEMINI_MODEL` esté disponible
   - Usa `gemini-1.5-flash` como modelo gratuito predeterminado

2. **API Key inválida**:

   - Verifica que `GEMINI_API_KEY` esté correctamente configurada
   - Asegúrate de que la API key tenga permisos para usar Gemini

3. **Límite de cuota excedido**:
   - Verifica tu cuota en Google AI Studio
   - El modelo `gemini-1.5-flash` tiene una cuota gratuita generosa
