import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  // Configure CORS
  const allowedOrigins = process.env.ALLOWED_ORIGINS 
    ? process.env.ALLOWED_ORIGINS.split(',')
    : ['http://localhost:5001', 'http://localhost:5002'];
  
  app.enableCors({
    origin: allowedOrigins,
    credentials: true,
  });
  
  // Use PORT environment variable (required for Cloud Run)
  const port = process.env.PORT || 3002;
  await app.listen(port);
  
  console.log(`🍌 Backend Frutta running on http://localhost:${port}`);
}
bootstrap();
