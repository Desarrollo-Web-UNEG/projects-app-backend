import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Comments } from '@/modules/comments/entities/comments.entity';

/**
 * Servicio CommentsService
 * Este servicio es responsable de la lógica de negocio relacionada con los comentarios.
 * Interactúa directamente con la base de datos a través del repositorio de Comments.
 */
@Injectable()
export class CommentsService {
  constructor(
    // Inyecta el repositorio de Comments, lo que permite realizar operaciones CRUD en la tabla de comentarios.
    @InjectRepository(Comments)
    private readonly commentsRepository: Repository<Comments>,
  ) {}

  /**
   * Crea un nuevo comentario en la base de datos.
   * @param commentData Datos parciales del comentario a crear.
   * @returns El comentario recién creado.
   */
  async create(commentData: Partial<Comments>): Promise<Comments> {
    const newComment = this.commentsRepository.create(commentData);
    return this.commentsRepository.save(newComment);
  }

  /**
   * Obtiene todos los comentarios de la base de datos.
   * @returns Un array con todos los comentarios.
   */
  async findAll(): Promise<Comments[]> {
    return this.commentsRepository.find();
  }

  /**
   * Encuentra un comentario por su ID.
   * @param id El ID del comentario a buscar.
   * @returns El comentario encontrado.
   * @throws NotFoundException Si el comentario con el ID especificado no se encuentra.
   */
  async findOne(id: number): Promise<Comments> {
    const comment = await this.commentsRepository.findOne({ where: { id } });
    if (!comment) {
      throw new NotFoundException(`Comment with ID ${id} not found`);
    }
    return comment;
  }

  /**
   * Actualiza un comentario existente por su ID.
   * @param id El ID del comentario a actualizar.
   * @param commentData Datos parciales para actualizar el comentario.
   * @returns El comentario actualizado.
   * @throws NotFoundException Si el comentario con el ID especificado no se encuentra.
   */
  async update(id: number, commentData: Partial<Comments>): Promise<Comments> {
    const comment = await this.commentsRepository.findOne({ where: { id } });
    if (!comment) {
      throw new NotFoundException(`Comment with ID ${id} not found`);
    }
    // Asigna los nuevos datos al comentario existente y lo guarda.
    Object.assign(comment, commentData);
    return this.commentsRepository.save(comment);
  }

  /**
   * Elimina un comentario por su ID.
   * @param id El ID del comentario a eliminar.
   * @throws NotFoundException Si el comentario con el ID especificado no se encuentra.
   */
  async remove(id: number): Promise<void> {
    const result = await this.commentsRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Comment with ID ${id} not found`);
    }
  }
}
