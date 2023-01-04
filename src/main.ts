import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
const cors = require('cors');

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // app.enableCors();
  app.setGlobalPrefix('api');
  // //app.use(morgan('tiny', { stream: logStream }));
  // var corsOptions = {
  //   origin: [
  //     `http://localhost:3000`,
  //     `https://hotel-management-1bgq.vercel.app`,
  //   ],
  // };
  app.use(cors({ origin: ['http://localhost:3000', /\.regenci\.online$/], credentials: true }))
  await app.listen(parseInt(process.env.PORT));
}
bootstrap();
