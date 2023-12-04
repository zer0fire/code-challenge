import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { generateDocument } from './doc';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // build document
  generateDocument(app);

  // app.useGlobalPipes(new ValidationPipe());
  // console.log(process.env.APP_PORT);
  await app.listen(process.env.APP_PORT || 3000);
}
bootstrap();
