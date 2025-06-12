import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Evaluation } from '../evaluation/evaluation.entity';

@Entity()
export class Judgement {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ nullable: true })
  description: string;

  @OneToMany(() => Evaluation, (evaluation) => evaluation.judgement)
  evaluations: Evaluation[];
} 