import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Project } from '@project/entities/project.entity';
import { People } from '@people/entities/people.entity';

/**
 * Entidad Comments
 * Representa un comentario asociado a un proyecto y una persona en la base de datos.
 */
@Entity()
export class Comments {
  /**
   * Clave primaria autogenerada para el comentario.
   */
  @PrimaryGeneratedColumn()
  id: number;

  /**
   * Contenido del comentario.
   */
  @Column({ type: 'varchar' })
  description: string;

  /**
   * Fecha en que se realizó el comentario.
   */
  @Column({ type: 'date' })
  date: Date;

  /**
   * Clave foránea que referencia el ID del proyecto al que pertenece este comentario.
   */
  @Column({ type: 'int' })
  id_project: number;

  /**
   * Relación de muchos a uno con la entidad Project.
   * Un comentario pertenece a un solo proyecto.
   * El decorador @JoinColumn especifica la columna de unión (clave foránea).
   */
  @ManyToOne(() => Project, (project) => project.comments)
  @JoinColumn({ name: 'id_project' })
  project: Project;

  /**
   * Clave foránea que referencia el ID de la persona que realizó este comentario.
   */
  @Column({ type: 'varchar' })
  id_people: string;

  /**
   * Relación de muchos a uno con la entidad People.
   * Un comentario es realizado por una sola persona.
   * El decorador @JoinColumn especifica la columna de unión (clave foránea).
   */
  @ManyToOne(() => People, (people) => people.comments)
  @JoinColumn({ name: 'id_people' })
  people: People;
}
