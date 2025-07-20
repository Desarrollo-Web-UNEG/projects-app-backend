import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn } from 'typeorm';
import { People } from './people.entity';
import { Project } from '@/modules/project/entities/project.entity';

@Entity()
export class ProjectFile {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  url: string;

  @Column({ nullable: true })
  public_id: string;

  @Column({ nullable: true })
  format: string;

  @Column({ nullable: true })
  bytes: number;

  @Column({ default: 'file' })
  type: string;

  @Column({ nullable: true })
  external_link: string;

  @CreateDateColumn()
  created_at: Date;

  @ManyToOne(() => People, (people) => people.projectFiles, { eager: true })
  people: People;

  @ManyToOne(() => Project, (project) => project.files, { eager: true })
  project: Project;
} 