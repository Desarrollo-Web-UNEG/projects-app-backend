import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToMany,
  JoinTable,
  OneToMany,
  ManyToOne,
} from 'typeorm';
import { Exclude } from 'class-transformer';
import { Badge } from '@badge/badge.entity';
import { Project } from '@project/entities/project.entity';
import { Comments } from '@comments/comments.entity';
import { Evaluation } from '@/modules/evaluation/entities/evaluation.entity';

export enum UserType {
  STUDENT = 'student',
  PROFESSOR = 'professor',
  GUEST = 'guest',
  ADMIN = 'admin',
}

export enum UserStatus {
  PENDING = 'pending',
  APPROVED = 'approved',
  REJECTED = 'rejected',
}

@Entity('people')
export class People {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 100, nullable: false })
  name: string;

  @Column({ type: 'varchar', length: 100, nullable: false })
  last_name: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  address?: string;

  @Column({
    type: 'enum',
    enum: UserType,
    default: UserType.GUEST,
    nullable: false,
  })
  user_type: UserType;

  @Column({ type: 'date', nullable: true })
  birthdate?: Date;

  @Column({ type: 'varchar', length: 150, unique: true, nullable: false })
  email: string;

  @Column({ type: 'varchar', length: 20, nullable: true })
  phone_number?: string;

  @Column({ type: 'varchar', length: 20, nullable: false })
  id_number: string;

  @Column({ type: 'varchar', length: 255, nullable: false })
  security_question: string;

  @Column({ type: 'varchar', length: 255, nullable: false })
  security_answer: string;

  @Column({ type: 'date', nullable: true })
  year_of_creation?: Date;

  @Column({ type: 'varchar', length: 255, nullable: false })
  @Exclude()
  password: string;

  @Column({
    type: 'enum',
    enum: UserStatus,
    default: UserStatus.PENDING,
    nullable: false,
  })
  status: UserStatus;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToMany(() => Badge, (badge) => badge.people)
  @JoinTable()
  badges: Badge[];

  @OneToMany(() => Project, (project) => project.people)
  projects: Project[];

  @OneToMany(() => Comments, (comments) => comments.people)
  comments: Comments[];

  @OneToMany(() => Evaluation, (evaluation) => evaluation.evaluator)
  evaluations: Evaluation[];
} 