import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Project } from '@project/entities/project.entity';

/**
 * Entidad que representa un período académico
 */
@Entity()
export class AcademicPeriod {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  description: string;

  @Column({ type: 'date', nullable: true })
  start_date: Date;

  @Column({ type: 'date', nullable: true })
  end_date: Date;

  @Column({ nullable: true })
  observation: string;

  @OneToMany(() => Project, (project) => project.academicPeriod)
  projects: Project[];
} 