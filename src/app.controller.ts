import { Controller, Get } from '@nestjs/common';
import { AppService } from '@/app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('health')
  getHealth() {
    return this.appService.checkDatabaseConnection();
  }

  @Get('api')
  getApiInfo() {
    return {
      message: 'API de Projects App Backend',
      version: '1.0.0',
      status: 'running',
      endpoints: {
        auth: '/api/auth',
        people: '/api/people',
        projects: '/api/projects',
        subjects: '/api/subjects',
        evaluations: '/api/evaluations',
        comments: '/api/comments',
        badges: '/api/badge',
        categories: '/api/categories',
        technology: '/api/technology',
        scores: '/api/scores',
        judgements: '/api/judgements',
        academicPeriods: '/api/academic-periods',
        ai: '/api/ai'
      }
    };
  }
}
