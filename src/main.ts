import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    allowedHeaders: ['content-type'],
    origin: 'https://hotel-management-1bgq.vercel.app',
    credentials: true,
  });
  app.setGlobalPrefix('api');
  //app.use(morgan('tiny', { stream: logStream }));
  await app.listen(parseInt(process.env.PORT));
}
bootstrap();
