import { PartialType } from '@nestjs/swagger';
import { CreateCommentDto } from '@comments/dto/create-comment.dto';

/**
 * UpdateCommentDto
 * DTO (Data Transfer Object) utilizado para validar y tipar los datos
 * al actualizar un comentario existente.
 * Extiende de PartialType de CreateCommentDto, lo que hace que todos
 * los campos de CreateCommentDto sean opcionales para la actualización.
 */
export class UpdateCommentDto extends PartialType(CreateCommentDto) {}
