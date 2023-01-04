import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  // const app = await NestFactory.create(AppModule);
  // app.enableCors();
  // //app.use(morgan('tiny', { stream: logStream }));
  // var corsOptions = {
  //   origin: [
  //     `http://localhost:3000`,
  //     `https://hotel-management-1bgq.vercel.app`,
  //   ],
  // };
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.setGlobalPrefix('api');
  await app.listen(parseInt(process.env.PORT));
}
bootstrap();
