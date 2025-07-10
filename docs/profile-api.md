# Documentación API de Profile - Consulta de Usuario por Cédula

## Descripción General

Este endpoint permite obtener el perfil completo de un usuario utilizando su número de cédula como identificador único. La función implementa autenticación JWT para proteger el acceso a la información personal de los usuarios. Esta funcionalidad es especialmente útil para sistemas que requieren búsqueda de usuarios por documento de identidad.

## Autenticación

El endpoint requiere autenticación mediante JWT. Para las peticiones autenticadas, incluir el token en el header:

```
Authorization: Bearer <tu-token-jwt>
```

## Estructura de Datos

### Entidad People (Campos Retornados)

- `id`: string (UUID del usuario)
- `name`: string (nombre del usuario)
- `last_name`: string (apellido del usuario)
- `email`: string (correo electrónico)
- `user_type`: string (tipo de usuario: 'student', 'professor', 'guest', 'admin')
- `status`: string (estado del usuario: 'pending', 'approved', 'rejected')
- `address`: string (dirección del usuario, opcional)
- `birthdate`: Date (fecha de nacimiento, opcional)
- `phone_number`: string (número de teléfono, opcional)
- `id_number`: string (número de cédula)
- `security_question`: string (pregunta de seguridad)
- `year_of_creation`: Date (año de creación, opcional)
- `createdAt`: Date (fecha de creación del registro)
- `updatedAt`: Date (fecha de última actualización)

## Endpoints

### 1. Obtener Usuario por Cédula

```http
GET /people/profile/cedula/{id_number}
```

Obtiene el perfil completo de un usuario utilizando su número de cédula como identificador único.

**Requisitos:**

- Token JWT válido
- Número de cédula válido en la URL

**Parámetros de URL:**

- `id_number`: string (número de cédula del usuario a buscar)

**Respuesta exitosa (200):**

```json
{
  "id": "e7b8c1a2-1234-4f56-9abc-1234567890ab",
  "name": "Juan Carlos",
  "last_name": "Pérez González",
  "email": "juan.perez@example.com",
  "user_type": "student",
  "status": "approved",
  "address": "Calle Principal #123, Ciudad",
  "birthdate": "1995-03-15",
  "phone_number": "+58-412-1234567",
  "id_number": "V-12345678",
  "security_question": "¿Cuál es el nombre de tu primera mascota?",
  "year_of_creation": "2023-09-01",
  "createdAt": "2023-09-01T10:30:00.000Z",
  "updatedAt": "2024-01-15T14:45:00.000Z"
}
```

**Errores comunes:**

- 401: No autorizado (token JWT inválido o ausente)
- 404: Usuario no encontrado (cédula no existe en la base de datos)

## Guía de Pruebas en Postman

### Configuración Inicial

1. Crear una nueva colección en Postman llamada "Profile API"
2. Configurar una variable de entorno para la URL base:
   - Variable: `base_url`
   - Valor: `http://localhost:3000` (ajustar según tu configuración)
3. Configurar una variable para el token JWT:
   - Variable: `jwt_token`
   - Valor: `<tu-token-jwt-actual>`

### Headers Comunes

```
Content-Type: application/json
Authorization: Bearer {{jwt_token}}
```

### Ejemplo de Petición para Obtener Usuario por Cédula

```http
GET {{base_url}}/people/profile/cedula/V-12345678
```

### Ejemplo de Respuesta Exitosa

```json
{
  "id": "e7b8c1a2-1234-4f56-9abc-1234567890ab",
  "name": "María Elena",
  "last_name": "Rodríguez Silva",
  "email": "maria.rodriguez@example.com",
  "user_type": "professor",
  "status": "approved",
  "address": "Avenida Universidad #456, Sector Universitario",
  "birthdate": "1980-07-22",
  "phone_number": "+58-414-9876543",
  "id_number": "V-12345678",
  "security_question": "¿En qué ciudad naciste?",
  "year_of_creation": "2022-03-15",
  "createdAt": "2022-03-15T08:15:00.000Z",
  "updatedAt": "2024-01-20T16:30:00.000Z"
}
```

### Ejemplo de Respuesta de Error (Usuario no encontrado)

```json
{
  "statusCode": 404,
  "message": "Usuario no encontrado",
  "error": "Not Found"
}
```

### Ejemplo de Respuesta de Error (No autorizado)

```json
{
  "statusCode": 401,
  "message": "Unauthorized",
  "error": "Unauthorized"
}
```

## Consejos para Pruebas

1. **Autenticación:**

   - Asegúrate de tener un token JWT válido antes de realizar las pruebas.
   - El token debe corresponder a un usuario autenticado en el sistema.
   - Verifica que el token no haya expirado.

2. **Flujo de Prueba Recomendado:**

   1. Primero, autentícate en el sistema para obtener un token JWT válido.
   2. Usa el endpoint `/auth/login` para obtener el token.
   3. Prueba la búsqueda con una cédula que sabes que existe en la base de datos.
   4. Prueba con una cédula inexistente para verificar el manejo de errores 404.
   5. Prueba sin el token JWT para verificar la protección de autenticación.
   6. Prueba con un token JWT inválido para verificar el manejo de errores 401.

3. **Casos de Prueba Específicos:**

   - **Cédula válida existente**: Debe retornar el perfil completo del usuario.
   - **Cédula inexistente**: Debe retornar error 404 con mensaje "Usuario no encontrado".
   - **Sin token JWT**: Debe retornar error 401 "Unauthorized".
   - **Token JWT inválido**: Debe retornar error 401 "Unauthorized".
   - **Cédula con formato incorrecto**: Debe retornar error 404 si no existe en la base de datos.

4. **Manejo de Errores:**

   - Verifica los códigos de estado HTTP.
   - Revisa los mensajes de error en el cuerpo de la respuesta.
   - Confirma que la estructura de error sea consistente.

5. **Validación de Datos:**
   - Verifica que todos los campos retornados correspondan a los definidos en la entidad People.
   - Confirma que los campos opcionales se manejen correctamente (null o undefined).
   - Verifica que las fechas estén en formato ISO 8601.

## Códigos de Estado HTTP

- 200: Operación exitosa - Usuario encontrado y retornado
- 401: No autorizado - Token JWT inválido, ausente o expirado
- 404: Recurso no encontrado - La cédula no existe en la base de datos
- 500: Error interno del servidor - Error en el procesamiento de la solicitud

## Notas Importantes

- El endpoint requiere autenticación JWT para acceder a la información del usuario.
- La búsqueda es exacta por número de cédula (no admite búsquedas parciales).
- Los campos sensibles como `password` no se incluyen en la respuesta por seguridad.
- El endpoint retorna información completa del perfil excepto la contraseña.
- La cédula debe existir previamente en la base de datos para obtener resultados.
- El formato de cédula debe coincidir exactamente con el almacenado en la base de datos.

## Seguridad

- Todos los endpoints están protegidos con autenticación JWT.
- La información sensible (contraseña) se excluye de las respuestas.
- Se recomienda usar HTTPS en producción para proteger la transmisión de datos.
- Los tokens JWT deben tener un tiempo de expiración apropiado.
