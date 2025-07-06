import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { CommentsService } from '@/modules/comments/service/comments.service';
import { CreateCommentDto } from '@comments/dto/create-comment.dto';
import { UpdateCommentDto } from '@comments/dto/update-comment.dto';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

/**
 * Controlador CommentsController
 * Este controlador maneja todas las solicitudes HTTP para la entidad Comments.
 * Las rutas están prefijadas con '/comments'.
 */
@ApiTags('Comments')
@Controller('comments')
export class CommentsController {
  constructor(
    // Inyecta el CommentsService para utilizar sus métodos de lógica de negocio.
    private readonly commentsService: CommentsService,
  ) {}

  /**
   * Maneja las solicitudes POST para crear un nuevo comentario.
   * @param createCommentDto Objeto de transferencia de datos con la información del nuevo comentario.
   * @returns El comentario creado.
   */
  @Post()
  @ApiOperation({ summary: 'Crear un nuevo comentario' })
  @ApiResponse({ status: 201, description: 'El comentario ha sido creado exitosamente.' })
  @ApiResponse({ status: 401, description: 'No autorizado.' })
  create(@Body() createCommentDto: CreateCommentDto) {
    return this.commentsService.create(createCommentDto);
  }

  /**
   * Maneja las solicitudes GET para obtener todos los comentarios.
   * @returns Un array de comentarios.
   */
  @Get()
  @ApiOperation({ summary: 'Obtener todos los comentarios' })
  @ApiResponse({ status: 200, description: 'Lista de todos los comentarios.' })
  @ApiResponse({ status: 401, description: 'No autorizado.' })
  findAll() {
    return this.commentsService.findAll();
  }

  /**
   * Maneja las solicitudes GET para obtener un comentario específico por su ID.
   * @param id El ID del comentario a buscar.
   * @returns El comentario encontrado.
   */
  @Get(':id')
  @ApiOperation({ summary: 'Obtener un comentario por su ID' })
  @ApiResponse({ status: 200, description: 'Comentario encontrado.' })
  @ApiResponse({ status: 404, description: 'Comentario no encontrado.' })
  @ApiResponse({ status: 401, description: 'No autorizado.' })
  findOne(@Param('id') id: string) {
    return this.commentsService.findOne(+id);
  }

  /**
   * Maneja las solicitudes PATCH para actualizar un comentario existente por su ID.
   * @param id El ID del comentario a actualizar.
   * @param updateCommentDto Objeto de transferencia de datos con la información actualizada del comentario.
   * @returns El comentario actualizado.
   */
  @Patch(':id')
  @ApiOperation({ summary: 'Actualizar un comentario por su ID' })
  @ApiResponse({ status: 200, description: 'El comentario ha sido actualizado exitosamente.' })
  @ApiResponse({ status: 404, description: 'Comentario no encontrado.' })
  @ApiResponse({ status: 401, description: 'No autorizado.' })
  update(@Param('id') id: string, @Body() updateCommentDto: UpdateCommentDto) {
    return this.commentsService.update(+id, updateCommentDto);
  }

  /**
   * Maneja las solicitudes DELETE para eliminar un comentario por su ID.
   * @param id El ID del comentario a eliminar.
   */
  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar un comentario por su ID' })
  @ApiResponse({ status: 200, description: 'El comentario ha sido eliminado exitosamente.' })
  @ApiResponse({ status: 404, description: 'Comentario no encontrado.' })
  @ApiResponse({ status: 401, description: 'No autorizado.' })
  remove(@Param('id') id: string) {
    return this.commentsService.remove(+id);
  }
}
