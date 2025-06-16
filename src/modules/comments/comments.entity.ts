import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Project } from '../project/entities/project.entity';

@Entity()
export class Comments {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  description: string;

  @Column({ type: 'date', nullable: true })
  date: Date;

  @ManyToOne(() => Project, (project) => project.comments)
  project: Project;
} 