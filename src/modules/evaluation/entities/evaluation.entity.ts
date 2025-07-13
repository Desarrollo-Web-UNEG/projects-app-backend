import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { Project } from '@project/entities/project.entity';
import { People } from '@people/entities/people.entity';
import { Judgement } from '@judgement/entities/judgement.entity';
import { AcademicPeriod } from '@/modules/academic-period/entities/academic-period.entity';

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

  @ManyToOne(() => People, (people) => people.evaluations)
  evaluator: People;

  @ManyToMany(() => Judgement, (judgement) => judgement.evaluations)
  judgements: Judgement[];

  @ManyToOne(() => AcademicPeriod, { nullable: false })
  academicPeriod: AcademicPeriod;

  @ManyToMany(() => Project, (project) => project.evaluations)
  projects: Project[];
}
