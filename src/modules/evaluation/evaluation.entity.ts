import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Project } from '../project/project.entity';
import { People } from '../people/entities/people.entity';
import { Judgement } from '../judgement/judgement.entity';

@Entity()
export class Evaluation {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('float')
  score: number;

  @Column({ nullable: true })
  title: string;

  @Column({ nullable: true })
  description: string;

  @ManyToOne(() => Project, (project) => project.evaluations)
  project: Project;

  @ManyToOne(() => People, (people) => people.evaluations)
  evaluator: People;

  @ManyToOne(() => Judgement, (judgement) => judgement.evaluations)
  judgement: Judgement;
} 