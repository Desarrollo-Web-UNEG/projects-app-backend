import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import {
  Badge,
  Project,
  AcademicPeriod,
  Score,
  Comments,
  Subject,
  Technology,
  Category,
  Evaluation,
  Judgement,
} from './modules';

import { People } from '@people/entities/people.entity';
import { AuthModule } from '@auth/auth.module';
import { PeopleModule } from '@people/people.module';
import { SubjectModule } from '@subject/subject.module';
import { AcademicPeriodModule } from '@academic-period/academic-period.module';
import { ProjectModule } from '@project/project.module';
import { JudgementModule } from '@judgement/judgement.module';
import { ScoresModule } from '@scores/scores.module';
import { CategoryModule } from '@category/category.module';
import { TechnologyModule } from '@technology/technology.module';
import { CommentsModule } from '@comments/comments.module';
import { EvaluationModule } from '@evaluation/evaluation.module';
import { BadgeModule } from '@badge/badge.module';


/**
 * AppModule
 * Módulo raíz de la aplicación NestJS.
 * Configura los módulos principales, la conexión a la base de datos y los controladores/servicios globales.
 */
@Module({
  imports: [
    ConfigModule.forRoot(),
    // Configura la conexión principal a la base de datos PostgreSQL usando TypeORM.
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: parseInt(process.env.POSTGRES_PORT || '5432'),
      username: process.env.POSTGRES_USERNAME,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DATABASE,
      autoLoadEntities: true,
      synchronize: true,
      ssl: process.env.POSTGRES_SSL === 'true',
      ...(process.env.POSTGRES_SSL === 'true' && {
        extra: {
          ssl: {
            rejectUnauthorized: false,
          },
        },
      }),
      entities: [
        Badge,
        People,
        Project,
        AcademicPeriod,
        Score,
        Comments,
        Subject,
        Technology,
        Category,
        Evaluation,
        Judgement,
      ],
    }),
    // Registra entidades con TypeORM para que puedan ser utilizadas por los repositorios.
    TypeOrmModule.forFeature([
      Badge,
      People,
      Project,
      AcademicPeriod,
      Score,
      Comments,
      Subject,
      Technology,
      Category,
      Evaluation,
      Judgement,
    ]),
    // Módulos de la aplicación.
    AuthModule,
    PeopleModule,
    SubjectModule,
    AcademicPeriodModule,
    ProjectModule,
    JudgementModule,
    ScoresModule,
    CategoryModule,
    CommentsModule, // Módulo de comentarios para gestionar el CRUD de comentarios.
    TechnologyModule,
    EvaluationModule,
    BadgeModule,
  ],
  // Controladores globales de la aplicación.
  controllers: [AppController],
  // Proveedores de servicios globales de la aplicación.
  providers: [AppService],
})
export class AppModule {}
