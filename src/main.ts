import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // ✅ PIPE 1: ValidationPipe (Global)
  // Bật pipe này để các decorator @IsString(), @IsOptional()... trong DTO hoạt động
  // whitelist: true → tự động loại bỏ các field không có trong DTO
  // transform: true → tự động chuyển đổi kiểu dữ liệu (ví dụ string "1" → number 1)
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      forbidNonWhitelisted: true
    }),
  );
  const configService = new ConfigService();
  console.log(`${configService.get<string>('DB_HOST')}`);
  const port = configService.get<number>('PORT') ?? 3000;
  await app.listen(port);
  console.log(`Application is running on: http://localhost:${port}`);
}
bootstrap();
