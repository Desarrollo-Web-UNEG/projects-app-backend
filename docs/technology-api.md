# Documentación API de Technology

## Descripción General

Este módulo maneja la gestión de tecnologías en el sistema, permitiendo crear, consultar y actualizar tecnologías que pueden ser asociadas a proyectos. La API implementa autenticación JWT y control de roles para proteger los endpoints.

## Autenticación

Todos los endpoints requieren autenticación mediante JWT. Para las peticiones autenticadas, incluir el token en el header:

```
Authorization: Bearer <tu-token-jwt>
```

## Estructura de Datos

La entidad Technology tiene los siguientes atributos:

- `id`: number (autogenerado)
- `name`: string (nombre de la tecnología)

## Endpoints

### 1. Crear Tecnología

```http
POST /technology
```

Crea una nueva tecnología en el sistema.

**Requisitos:**

- Token JWT válido
- Rol de ADMIN

**Body:**

```json
{
  "name": "React"
}
```

### 2. Obtener Todas las Tecnologías

```http
GET /technology
```

Obtiene la lista de todas las tecnologías registradas.

**Requisitos:**

- Token JWT válido

### 3. Obtener Tecnología por ID

```http
GET /technology/:id
```

Obtiene una tecnología específica por su ID.

**Requisitos:**

- Token JWT válido

**Parámetros:**

- `id`: ID de la tecnología a consultar

### 4. Actualizar Tecnología

```http
PUT /technology/:id
```

Actualiza la información de una tecnología existente.

**Requisitos:**

- Token JWT válido
- Rol de ADMIN

**Parámetros:**

- `id`: ID de la tecnología a actualizar

**Body:**

```json
{
  "name": "React.js"
}
```

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

### Ejemplos de Peticiones

1. **Crear Tecnología:**

   ```http
   POST {{base_url}}/technology
   Body:
   {
     "name": "Node.js"
   }
   ```

2. **Obtener Todas las Tecnologías:**

   ```http
   GET {{base_url}}/technology
   ```

3. **Obtener Tecnología por ID:**

   ```http
   GET {{base_url}}/technology/1
   ```

4. **Actualizar Tecnología:**
   ```http
   PUT {{base_url}}/technology/1
   Body:
   {
     "name": "Node.js v18"
   }
   ```

### Consejos para Pruebas

1. **Autenticación:**

   - Asegúrate de tener un token JWT válido antes de realizar las pruebas
   - Para endpoints que requieren rol de ADMIN, usa una cuenta con ese rol

2. **Flujo de Prueba Recomendado:**

   1. Crear una nueva tecnología
   2. Obtener la lista de tecnologías para verificar la creación
   3. Obtener la tecnología específica por ID
   4. Actualizar la tecnología
   5. Verificar los cambios

3. **Manejo de Errores:**
   - Verifica los códigos de estado HTTP
   - Revisa los mensajes de error en el cuerpo de la respuesta
   - Prueba casos de error como:
     - Crear tecnología con nombre duplicado
     - Actualizar tecnología inexistente
     - Acceder sin autenticación

## Códigos de Estado HTTP

- 200: Operación exitosa
- 201: Recurso creado exitosamente
- 400: Error en la solicitud
- 401: No autorizado
- 403: Prohibido (sin permisos)
- 404: Recurso no encontrado
- 409: Conflicto (nombre duplicado)
- 500: Error interno del servidor

## Notas Importantes

- Los nombres de las tecnologías deben ser únicos en el sistema
- Solo los administradores pueden crear y actualizar tecnologías
- Cualquier usuario autenticado puede consultar las tecnologías
- Las tecnologías pueden estar asociadas a múltiples proyectos
