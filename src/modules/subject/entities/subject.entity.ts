import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  OneToMany,
  JoinTable,
} from 'typeorm';
import { Project } from '@project/entities/project.entity';
import { People } from '@/modules/people/entities';
import { SubjectPeople } from '@subject/entities/subject-people.entity';

@Entity()
export class Subject {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  isActive: boolean;

  @Column()
  requirement: number[];

  @OneToMany(() => Project, (project) => project.subject)
  projects: Project[];

  @OneToMany(() => SubjectPeople, (subjectPeople) => subjectPeople.subject)
  subjectPeople: SubjectPeople[];
}
