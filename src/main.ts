import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  // var corsOptions = {
  //   origin: [
  //     `http://localhost:3000`,
  //     `https://hotel-management-1bgq.vercel.app`,
  //   ],
  // };
  const app = await NestFactory.create(AppModule, { cors: true });
  // app.use(cors(corsOptions));
  app.enableCors({
    allowedHeaders: '*',
    origin: '*',
    credentials: true,
  });
  app.setGlobalPrefix('api');
  await app.listen(parseInt(process.env.PORT));
}
bootstrap();
