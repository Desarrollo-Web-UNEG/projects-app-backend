import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Project } from '@project/entities/project.entity';
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

  @Column('int', { array: true, nullable: true })
  requirement: number[];

  @OneToMany(() => Project, (project) => project.subject)
  projects: Project[];

  @OneToMany(() => SubjectPeople, (subjectPeople) => subjectPeople.subject)
  subjectPeople: SubjectPeople[];
}
