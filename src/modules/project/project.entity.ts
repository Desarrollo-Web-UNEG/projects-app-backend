import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { People } from '../people/people.entity';
import { Scores } from '../scores/scores.entity';
import { Comments } from '../comments/comments.entity';
import { Subject } from '../subject/subject.entity';
import { Technology } from '../technology/technology.entity';
import { Category } from '../category/category.entity';
import { AcademicPeriod } from '../academic-period/academic-period.entity';
import { Evaluation } from '../evaluation/evaluation.entity';

@Entity()
export class Project {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column({ nullable: true })
  description: string;

  @Column({ nullable: true })
  objectives: string;

  @ManyToOne(() => People, (people) => people.projects)
  people: People;

  @ManyToOne(() => AcademicPeriod, (period) => period.projects)
  academicPeriod: AcademicPeriod;

  @OneToMany(() => Scores, (scores) => scores.project)
  scores: Scores[];

  @OneToMany(() => Comments, (comments) => comments.project)
  comments: Comments[];

  @ManyToOne(() => Subject, (subject) => subject.projects)
  subject: Subject;

  @ManyToMany(() => Technology, (tech) => tech.projects)
  @JoinTable()
  technologies: Technology[];

  @ManyToOne(() => Category, (cat) => cat.projects)
  category: Category;

  @OneToMany(() => Evaluation, (evaluation) => evaluation.project)
  evaluations: Evaluation[];
}
