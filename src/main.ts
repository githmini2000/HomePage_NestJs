import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import serveStatic from 'serve-static';
import path from 'path';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(serveStatic(path.join(__dirname, '..', 'assets')));
  // Enable CORS
  app.enableCors({
    origin: ['http://localhost:3000', 'http://localhost:3002'],
    methods: 'GET,POST,PUT,DELETE',
    allowedHeaders: 'Content-Type,Authorization',
  });

  await app.listen(3001);
}
bootstrap();
