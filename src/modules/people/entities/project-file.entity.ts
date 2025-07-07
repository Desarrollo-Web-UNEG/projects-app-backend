import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn } from 'typeorm';
import { People } from './people.entity';
import { Project } from '@/modules/project/entities/project.entity';

@Entity()
export class ProjectFile {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  url: string;

  @Column()
  public_id: string;

  @Column()
  format: string;

  @Column()
  bytes: number;

  @CreateDateColumn()
  created_at: Date;

  @ManyToOne(() => People, (people) => people.projectFiles, { eager: true })
  people: People;

  @ManyToOne(() => Project, (project) => project.files, { eager: true })
  project: Project;
} 