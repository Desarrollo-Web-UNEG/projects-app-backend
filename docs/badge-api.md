# Documentación API de Badge - Asignación de Insignias

## Descripción General

Este módulo permite a los administradores asignar insignias (badges) a estudiantes dentro del sistema. Las insignias reconocen logros o características especiales de los estudiantes. La API implementa autenticación JWT y control de roles para proteger los endpoints.

## Autenticación

Todos los endpoints requieren autenticación mediante JWT. Para las peticiones autenticadas, incluir el token en el header:

```
Authorization: Bearer <tu-token-jwt>
```

## Estructura de Datos

### Entidad Badge

- `id`: number (autogenerado)
- `name`: string (nombre de la insignia)
- `description`: string (descripción de la insignia)

### Entidad People (solo campos relevantes)

- `id`: string (UUID del estudiante)
- `name`: string (nombre)
- `last_name`: string (apellido)
- `user_type`: string (tipo de usuario, debe ser 'student' para este endpoint)
- `badges`: Badge[] (insignias asignadas)

### DTO para Asignación

- `peopleId`: string (UUID del estudiante)
- `badgeId`: number (ID de la insignia)

## Endpoints

### 1. Asignar Insignia a un Estudiante

```http
POST /badge/assign
```

Asigna una insignia existente a un estudiante específico. Solo los administradores pueden realizar esta acción.

**Requisitos:**

- Token JWT válido
- Rol de ADMIN

**Body:**

```json
{
  "peopleId": "uuid-del-estudiante",
  "badgeId": 1
}
```

**Respuesta exitosa:**

```json
{
  "message": "Insignia asignada correctamente"
}
```

**Errores comunes:**

- 404: Estudiante o insignia no encontrada
- 409: El estudiante ya tiene esta insignia o no es de tipo 'student'

## Guía de Pruebas en Postman

### Configuración Inicial

1. Crear una nueva colección en Postman
2. Configurar una variable de entorno para la URL base:
   - Variable: `base_url`
   - Valor: `http://localhost:3000` (ajustar según tu configuración)

### Headers Comunes

```
Content-Type: application/json
Authorization: Bearer {{jwt_token}}
```

### Ejemplo de Petición para Asignar Insignia

```http
POST {{base_url}}/badge/assign
Body:
{
  "peopleId": "e7b8c1a2-1234-4f56-9abc-1234567890ab",
  "badgeId": 2
}
```

### Ejemplo de Respuesta Exitosa

```json
{
  "message": "Insignia asignada correctamente"
}
```

### Ejemplo de Respuesta de Error (Estudiante no encontrado)

```json
{
  "statusCode": 404,
  "message": "Estudiante no encontrado",
  "error": "Not Found"
}
```

### Ejemplo de Respuesta de Error (Insignia ya asignada)

```json
{
  "statusCode": 409,
  "message": "El estudiante ya tiene esta insignia",
  "error": "Conflict"
}
```

## Consejos para Pruebas

1. **Autenticación:**

   - Asegúrate de tener un token JWT válido antes de realizar las pruebas.
   - Usa una cuenta con rol ADMIN para este endpoint.

2. **Flujo de Prueba Recomendado:**

   1. Crea un estudiante y una insignia (si no existen).
   2. Asigna la insignia al estudiante usando el endpoint.
   3. Intenta asignar la misma insignia nuevamente para verificar el manejo de duplicados.
   4. Prueba con un usuario que no sea estudiante para verificar la restricción de tipo.
   5. Prueba con IDs inexistentes para verificar los mensajes de error.

3. **Manejo de Errores:**
   - Verifica los códigos de estado HTTP.
   - Revisa los mensajes de error en el cuerpo de la respuesta.

## Códigos de Estado HTTP

- 200: Operación exitosa
- 201: Recurso creado exitosamente
- 400: Error en la solicitud
- 401: No autorizado
- 403: Prohibido (sin permisos)
- 404: Recurso no encontrado
- 409: Conflicto (insignia ya asignada o tipo de usuario incorrecto)
- 500: Error interno del servidor

## Notas Importantes

- Solo los administradores pueden asignar insignias.
- Solo se pueden asignar insignias a usuarios de tipo 'student'.
- No se puede asignar la misma insignia dos veces al mismo estudiante.
- Los IDs deben ser válidos y existir en la base de datos.
