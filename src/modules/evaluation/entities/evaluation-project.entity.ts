import { Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn, Column } from 'typeorm';
import { Project } from '../../project/entities/project.entity';
import { Evaluation } from './evaluation.entity';

@Entity('evaluation_project')
export class EvaluationProject {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Project, { eager: true })
  @JoinColumn({ name: 'id_project' })
  project: Project;

  @ManyToOne(() => Evaluation, { eager: true })
  @JoinColumn({ name: 'id_evaluation' })
  evaluation: Evaluation;

  @Column({ type: 'float' })
  score: number;

  @Column({ type: 'varchar', nullable: true })
  description: string;
} 