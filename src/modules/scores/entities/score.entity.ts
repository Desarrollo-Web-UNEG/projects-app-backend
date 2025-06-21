import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { Project } from '@project/entities/project.entity';
import { People } from '@people/entities/people.entity';

@Entity('scores')
export class Score {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'int' })
  value: number;

  @Column({ type: 'text', nullable: true })
  feedback: string;

  @ManyToOne(() => Project, project => project.scores)
  project: Project;

  @ManyToOne(() => People)
  evaluator: People;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
} 