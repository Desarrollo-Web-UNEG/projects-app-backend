import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Project } from '../project/entities/project.entity';

@Entity()
export class Scores {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('float')
  score: number;

  @Column({ type: 'date', nullable: true })
  date: Date;

  @ManyToOne(() => Project, (project) => project.scores)
  project: Project;
} 