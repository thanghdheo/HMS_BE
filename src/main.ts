import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const options = {
    origin: true,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    preflightContinue: false,
    credentials: true,
    allowedHeaders: '*',
  };
  app.enableCors(options);
  app.setGlobalPrefix('api');
  //app.use(morgan('tiny', { stream: logStream }));
  await app.listen(parseInt(process.env.PORT));
}
bootstrap();
