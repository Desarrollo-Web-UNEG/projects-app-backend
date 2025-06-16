import { Entity, PrimaryGeneratedColumn, Column, ManyToMany } from 'typeorm';
import { Project } from '../../project/project.entity';

@Entity()
export class Technology {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @ManyToMany(() => Project, (project) => project.technologies)
  projects: Project[];
}
