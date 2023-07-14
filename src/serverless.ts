import { configure as serverlessExpress } from '@vendia/serverless-express';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

let cachedServer;

const handler = async (event, context) => {
  if (!cachedServer) {
    const app = await NestFactory.create(AppModule);
    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
      }),
    );
    await app.init();
    cachedServer = serverlessExpress({
      app: app.getHttpAdapter().getInstance(),
    });
  }

  return cachedServer(event, context);
};

export { handler };
