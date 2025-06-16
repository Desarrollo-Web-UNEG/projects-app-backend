import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import {
  Badge,
  Project,
  AcademicPeriod,
  Scores,
  Comments,
  Subject,
  Technology,
  Category,
  Evaluation,
  Judgement,
} from './modules';
import { People } from './modules/people/people.entity';
import { AuthModule } from './modules/auth/auth.module';
import { PeopleModule } from './modules/people/people.module';
import { SubjectModule } from './modules/subject/subject.module';
import { AcademicPeriodModule } from './modules/academic-period/academic-period.module';
import { ProjectModule } from './modules/project/project.module';
import { CommentsModule } from './modules/comments/comments.module';

/**
 * AppModule
 * Módulo raíz de la aplicación NestJS.
 * Configura los módulos principales, la conexión a la base de datos y los controladores/servicios globales.
 */
@Module({
  imports: [
    // Configura ConfigModule para cargar variables de entorno.
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
      entities: [
        Badge,
        People,
        Project,
        AcademicPeriod,
        Scores,
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
      Scores,
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
    CommentsModule, // Módulo de comentarios para gestionar el CRUD de comentarios.
  ],
  // Controladores globales de la aplicación.
  controllers: [AppController],
  // Proveedores de servicios globales de la aplicación.
  providers: [AppService],
})
export class AppModule {}
