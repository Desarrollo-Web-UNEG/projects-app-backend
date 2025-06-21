# Documentación API de People

## Descripción General

Este módulo maneja la gestión de usuarios en el sistema, incluyendo registro, aprobación, actualización y eliminación de usuarios. La API implementa autenticación JWT y control de roles para proteger los endpoints.

## Autenticación

Todos los endpoints requieren autenticación mediante JWT, excepto el registro de usuarios. Para las peticiones autenticadas, incluir el token en el header:

```
Authorization: Bearer <tu-token-jwt>
```

## Endpoints

### 1. Registro de Usuario

```http
POST /people/register
```

Registra un nuevo usuario en el sistema.

**Body:**

```json
{
  "email": "usuario@ejemplo.com",
  "password": "contraseña123",
  "firstName": "Juan",
  "lastName": "Pérez",
  "phone": "1234567890"
}
```

### 2. Obtener Usuarios Pendientes

```http
GET /people/pending
```

Obtiene la lista de usuarios pendientes de aprobación.

**Requisitos:**

- Token JWT válido
- Rol de ADMIN

### 3. Aprobar Usuario

```http
POST /people/:id/approve
```

Aprueba un usuario pendiente.

**Requisitos:**

- Token JWT válido
- Rol de ADMIN

**Parámetros:**

- `id`: ID del usuario a aprobar

### 4. Rechazar Usuario

```http
POST /people/:id/reject
```

Rechaza un usuario pendiente.

**Requisitos:**

- Token JWT válido
- Rol de ADMIN

**Parámetros:**

- `id`: ID del usuario a rechazar

### 5. Obtener Perfil

```http
GET /people/profile
```

Obtiene el perfil del usuario autenticado.

**Requisitos:**

- Token JWT válido

### 6. Actualizar Usuario

```http
PUT /people/:id
```

Actualiza la información de un usuario.

**Requisitos:**

- Token JWT válido
- Rol de ADMIN

**Parámetros:**

- `id`: ID del usuario a actualizar

**Body:**

```json
{
  "firstName": "Nuevo Nombre",
  "lastName": "Nuevo Apellido",
  "phone": "9876543210"
}
```

### 7. Eliminar Usuario

```http
DELETE /people/:id
```

Elimina un usuario del sistema.

**Requisitos:**

- Token JWT válido
- Rol de ADMIN

**Parámetros:**

- `id`: ID del usuario a eliminar

### 8. Buscar por Email

```http
GET /people/:email
```

Busca un usuario por su email.

**Requisitos:**

- Token JWT válido

**Parámetros:**

- `email`: Email del usuario a buscar

### 9. Obtener Todos los Usuarios

```http
GET /people
```

Obtiene la lista de todos los usuarios.

**Requisitos:**

- Token JWT válido
- Rol de ADMIN

## Guía de Pruebas en Postman

### Configuración Inicial

1. Crear una nueva colección en Postman
2. Configurar una variable de entorno para la URL base:
   - Variable: `base_url`
   - Valor: `http://localhost:3000` (ajustar según tu configuración)

### Consejos para Pruebas

1. **Autenticación:**

   - Guardar el token JWT recibido en el registro/login como variable de entorno
   - Usar la variable en el header Authorization para todas las peticiones autenticadas

2. **Flujo de Prueba Recomendado:**

   1. Registrar un nuevo usuario
   2. Iniciar sesión para obtener el token
   3. Probar endpoints que requieren autenticación
   4. Probar endpoints que requieren rol de ADMIN

3. **Manejo de Errores:**
   - Verificar los códigos de estado HTTP
   - Revisar los mensajes de error en el cuerpo de la respuesta

### Ejemplo de Configuración en Postman

1. **Headers Comunes:**

```
Content-Type: application/json
Authorization: Bearer {{jwt_token}}
```

2. **Variables de Entorno:**

```
base_url: http://localhost:3000
jwt_token: <token-obtenido-del-login>
```

## Códigos de Estado HTTP

- 200: Operación exitosa
- 201: Recurso creado exitosamente
- 400: Error en la solicitud
- 401: No autorizado
- 403: Prohibido (sin permisos)
- 404: Recurso no encontrado
- 500: Error interno del servidor

## Notas Importantes

- Todos los endpoints que requieren rol de ADMIN están protegidos con `RolesGuard`
- Las contraseñas deben cumplir con los requisitos de seguridad establecidos
- Los emails deben ser únicos en el sistema
- Se recomienda implementar rate limiting en producción
