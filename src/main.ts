import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: [
      'http://localhost:3000',
      'https://hotel-management-1bgq.vercel.app',
    ],
    methods: ['POST', 'PUT', 'DELETE', 'GET'],
  });
  app.setGlobalPrefix('api');
  //app.use(morgan('tiny', { stream: logStream }));
  await app.listen(parseInt(process.env.PORT));
}
bootstrap();
