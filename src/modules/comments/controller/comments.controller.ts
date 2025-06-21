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

/**
 * Controlador CommentsController
 * Este controlador maneja todas las solicitudes HTTP para la entidad Comments.
 * Las rutas están prefijadas con '/comments'.
 */
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
  create(@Body() createCommentDto: CreateCommentDto) {
    return this.commentsService.create(createCommentDto);
  }

  /**
   * Maneja las solicitudes GET para obtener todos los comentarios.
   * @returns Un array de comentarios.
   */
  @Get()
  findAll() {
    return this.commentsService.findAll();
  }

  /**
   * Maneja las solicitudes GET para obtener un comentario específico por su ID.
   * @param id El ID del comentario a buscar.
   * @returns El comentario encontrado.
   */
  @Get(':id')
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
  update(@Param('id') id: string, @Body() updateCommentDto: UpdateCommentDto) {
    return this.commentsService.update(+id, updateCommentDto);
  }

  /**
   * Maneja las solicitudes DELETE para eliminar un comentario por su ID.
   * @param id El ID del comentario a eliminar.
   */
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.commentsService.remove(+id);
  }
}
