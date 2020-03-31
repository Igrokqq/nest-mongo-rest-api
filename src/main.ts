import * as compression from 'compression';
import * as helmet from 'helmet';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './components/app/app.module';
import { ValidationPipe } from '@nestjs/common';
import { ServerExceptionFilter } from './exceptions/filters/server-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalFilters(new ServerExceptionFilter());

  app.use(compression());
  // sets secure headers globally
  app.use(helmet());
  // enables cors requests to our api
  app.enableCors();

  await app.listen(process.env.SERVER_PORT);
}

bootstrap();
