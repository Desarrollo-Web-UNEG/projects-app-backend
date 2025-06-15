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
import { People } from './modules/people/entities/people.entity';
import { AuthModule } from './modules/auth/auth.module';
import { PeopleModule } from './modules/people/people.module';
import { SubjectModule } from './modules/subject/subject.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
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
    AuthModule,
    PeopleModule,
    SubjectModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
