import { NestFactory } from '@nestjs/core';
import { AUTH_SERVICE, RmqService } from '@app/common';
import { AuthModule } from './auth.module';
import { RmqOptions } from '@nestjs/microservices';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AuthModule);
  const rmqService = app.get<RmqService>(RmqService);
  app.connectMicroservice<RmqOptions>(
    rmqService.getOptions(AUTH_SERVICE, true),
  );
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      forbidNonWhitelisted: true,
    }),
  );
  const configService = app.get(ConfigService);
  await app.startAllMicroservices();
  await app.listen(configService.get('PORT'));
  console.log('Running auth service!!!..');
}
bootstrap();
