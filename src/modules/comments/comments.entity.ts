import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Project } from '../project/project.entity';
import { People } from '../people/people.entity';

@Entity()
export class Comments {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar' })
  description: string;

  @Column({ type: 'date' })
  date: Date;

  @Column({ type: 'number' })
  id_project: number;

  @ManyToOne(() => Project, (project) => project.comments)
  @JoinColumn({ name: 'id_project' })
  project: Project;

  @Column({ type: 'varchar' })
  id_people: string;

  @ManyToOne(() => People, (people) => people.comments)
  @JoinColumn({ name: 'id_people' })
  people: People;
}
