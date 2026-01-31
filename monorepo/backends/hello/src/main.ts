import { NestFactory } from '@nestjs/core';
import { AppModule } from './mnt/user-data/outputs/monorepo/backends/hello/src/app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  await app.listen(3001);
  console.log('🚀 Backend Hello running on http://localhost:3001');
}
bootstrap();
