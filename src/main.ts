import { startApp } from '@ittlr/nest-bootstrap';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await startApp(app);
}
bootstrap();
