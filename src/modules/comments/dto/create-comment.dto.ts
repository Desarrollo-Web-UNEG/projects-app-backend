/**
 * CreateCommentDto
 * DTO (Data Transfer Object) utilizado para validar y tipar los datos
 * al crear un nuevo comentario.
 */
export class CreateCommentDto {
  /**
   * El contenido o texto del comentario.
   */
  description: string;

  /**
   * La fecha en que se realizó el comentario.
   */
  date: Date;

  /**
   * El ID del proyecto al que pertenece este comentario (clave foránea).
   */
  id_project: number;

  /**
   * El ID de la persona que realiza el comentario (clave foránea).
   */
  id_people: string;
}
