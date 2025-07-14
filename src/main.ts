import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as morgan from 'morgan';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Agrega esta línea para ver logs de peticiones HTTP
  app.use(morgan('dev'));

  await app.listen(3000);
}
bootstrap();
