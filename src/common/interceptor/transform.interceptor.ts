import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ResponseFormat } from '../interface/response.interface';

@Injectable()
export class TransformInterceptor<T>
  implements NestInterceptor<T, ResponseFormat<T>>
{
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<ResponseFormat<T>> {
    const ctx = context.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();
    const statusCode = response.statusCode;

    // Lấy startTime do StartTimingMiddleware gắn vào request, hoặc fallback Date.now()
    const startTime = request['startTime'] || Date.now();

    return next.handle().pipe(
      map((data) => ({
        statusCode,
        message: 'Success',
        data: data ?? null,
        timestamp: new Date().toISOString(),
        duration: `${Date.now() - startTime}ms`,
      })),
    );
  }
}
