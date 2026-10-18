import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { ValidationPipe } from '@nestjs/common';
import { TransformInterceptor } from './common/interceptor/transform.interceptor';
import { HttpExceptionFilter } from './common/filter/all-exception-filter';

import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

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

  // ✅ INTERCEPTOR: Chuẩn hóa định dạng Response trả về toàn cục
  app.useGlobalInterceptors(new TransformInterceptor());

  // ✅ FILTER: Bắt và chuẩn hóa định dạng Exception/lỗi trả về toàn cục
  app.useGlobalFilters(new HttpExceptionFilter());

  // ✅ SWAGGER: Cấu hình tài liệu API
  const config = new DocumentBuilder()
    .setTitle('NestJS Project API')
    .setDescription('Tài liệu hướng dẫn và test các API của hệ thống')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document);

  const configService = new ConfigService();
  console.log(`${configService.get<string>('DB_HOST')}`);
  const port = configService.get<number>('PORT') ?? 3000;
  await app.listen(port);
  console.log(`Application is running on: http://localhost:${port}`);
  console.log(`Swagger UI is running on: http://localhost:${port}/api/docs`);
}
bootstrap();
