import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { People } from '@people/entities/people.entity';
import { Score } from '@scores/entities/score.entity';
import { Comments } from '@/modules/comments/entities/comments.entity';
import { Subject } from '@subject/entities/subject.entity';
import { Technology } from '@technology/entities/technology.entity';
import { Category } from '@category/entities/category.entity';
import { AcademicPeriod } from '@academic-period/entities/academic-period.entity';
import { Evaluation } from '@/modules/evaluation/entities/evaluation.entity';
import { ProjectFile } from '@people/entities/project-file.entity';

@Entity()
export class Project {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column({ nullable: true })
  objectives: string;

  @ManyToOne(() => People, (people) => people.projects)
  people: People;

  @ManyToOne(() => AcademicPeriod, (period) => period.projects)
  academicPeriod: AcademicPeriod;

  @OneToMany(() => Score, (score) => score.project)
  scores: Score[];

  @OneToMany(() => Comments, (comments) => comments.project)
  comments: Comments[];

  @ManyToOne(() => Subject, (subject) => subject.projects)
  subject: Subject;

  @ManyToMany(() => Technology, (tech) => tech.projects)
  @JoinTable()
  technologies: Technology[];

  @ManyToOne(() => Category, (cat) => cat.projects)
  category: Category;


  @ManyToMany(() => Evaluation, (evaluation) => evaluation.projects)
  evaluations: Evaluation[];

  @OneToMany(() => ProjectFile, (file) => file.project)
  files: ProjectFile[];

}
