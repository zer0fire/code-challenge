import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import * as packageConfig from '../package.json';
import type { INestApplication } from '@nestjs/common';

export const generateDocument = (app: INestApplication<any>) => {
  const { name, description, version } = packageConfig;
  const options = new DocumentBuilder()
    .setTitle(name)
    .setDescription(description)
    .setVersion(version)
    .addBearerAuth()
    .build();

  const doc = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('/api/doc', app, doc);
};
