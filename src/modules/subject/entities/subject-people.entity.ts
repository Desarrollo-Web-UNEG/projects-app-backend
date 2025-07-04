import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  Column,
} from 'typeorm';
import { People } from '@people/entities/people.entity';
import { Subject } from './subject.entity';

@Entity('subject_people')
export class SubjectPeople {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => People, (people) => people.subjectPeople, { eager: true })
  @JoinColumn({ name: 'peopleid' })
  people: People;

  @ManyToOne(() => Subject, (subject) => subject.subjectPeople, { eager: true })
  @JoinColumn({ name: 'subjectid' })
  subject: Subject;

  @Column({ type: 'boolean', default: false })
  approved: boolean;

  @Column({ type: 'int', default: 0 })
  mark: number;
}
