# Módulo de IA - Chatbot Académico

Este módulo proporciona un chatbot académico basado en Google Gemini AI que responde únicamente preguntas relacionadas con temas educativos y científicos.

## Configuración

### Variables de Entorno

Agrega la siguiente variable de entorno a tu archivo `.env`:

```env
GEMINI_API_KEY=tu_api_key_de_gemini_aqui
```

Para obtener una API key de Gemini:

1. Ve a [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Crea una nueva API key
3. Copia la key y agrégala a tu archivo `.env`

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
  "model": "gemini-pro",
  "academicFocus": true
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
