import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable } from 'typeorm';
import { Evaluation } from '@/modules/evaluation/entities/evaluation.entity';

@Entity()
export class Judgement {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ nullable: true })
  description: string;

  @ManyToMany(() => Evaluation, (evaluation) => evaluation.judgements)
  @JoinTable()
  evaluations: Evaluation[];
} 