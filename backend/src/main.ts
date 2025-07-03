import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // Enable CORS (safe config for dev)
  app.enableCors({
    origin: 'http://localhost:3000', // Allow Next.js frontend
    credentials: true, //  Allow cookies if needed
  });

  await app.listen(5000);
}
bootstrap();
