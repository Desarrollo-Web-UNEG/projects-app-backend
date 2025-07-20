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

  @ManyToOne(() => People, (people) => people.projects, { onDelete: 'CASCADE' })
  people: People;

  @ManyToOne(() => AcademicPeriod, (period) => period.projects, { onDelete: 'SET NULL', nullable: true })
  academicPeriod: AcademicPeriod;

  @OneToMany(() => Score, (score) => score.project, { cascade: true, onDelete: 'CASCADE' })
  scores: Score[];

  @OneToMany(() => Comments, (comments) => comments.project, { cascade: true, onDelete: 'CASCADE' })
  comments: Comments[];

  @ManyToOne(() => Subject, (subject) => subject.projects, { onDelete: 'SET NULL', nullable: true })
  subject: Subject;

  @ManyToMany(() => Technology, (tech) => tech.projects)
  @JoinTable()
  technologies: Technology[];

  @ManyToOne(() => Category, (cat) => cat.projects, { onDelete: 'SET NULL', nullable: true })
  category: Category;


  @ManyToMany(() => Evaluation, (evaluation) => evaluation.projects)
  @JoinTable()
  evaluations: Evaluation[];

  @OneToMany(() => ProjectFile, (file) => file.project, { cascade: true, onDelete: 'CASCADE' })
  files: ProjectFile[];

}
