// src/main.ts
import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: 'http://localhost:3000',
    credentials: true,
  });

  // 全局开启参数校验，配合 DTO 使用
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,       // 过滤掉 DTO 里没定义的字段
      forbidNonWhitelisted: true,
      transform: true,       // 自动类型转换
    }),
  );

  await app.listen(process.env.PORT ?? 3001);
}
bootstrap();