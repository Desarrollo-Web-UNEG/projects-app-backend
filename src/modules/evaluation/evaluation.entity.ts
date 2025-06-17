import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  ManyToMany,
} from 'typeorm';
import { Project } from '../project/entities/project.entity';
import { People } from '../people/entities/people.entity';
import { Judgement } from '../judgement/entities/judgement.entity';

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

  @ManyToMany(() => Judgement, (judgement) => judgement.evaluations)
  judgements: Judgement[];
}
