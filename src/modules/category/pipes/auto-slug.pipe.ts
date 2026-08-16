import {
  PipeTransform,
  Injectable,
  ArgumentMetadata,
  Logger,
} from '@nestjs/common';

/**
 * ✅ PIPE 2: Custom Transform Pipe
 *
 * Pipe này làm 2 việc:
 * 1. Trim khoảng trắng thừa ở name
 * 2. Tự động tạo slug từ name nếu slug không được truyền vào
 *
 * Ví dụ:
 *   Input:  { name: "  Điện Thoại  " }
 *   Output: { name: "Điện Thoại", slug: "dien-thoai" }
 */
@Injectable()
export class AutoSlugPipe implements PipeTransform {
  private readonly logger = new Logger(AutoSlugPipe.name);

  transform(value: any, metadata: ArgumentMetadata) {
    // Pipe chạy cho mọi argument (@Body, @Param, @Query...)
    // Chỉ xử lý khi argument là @Body() (type === 'body')
    if (metadata.type !== 'body') {
      return value;
    }

    this.logger.log('========== AutoSlugPipe START ==========');
    this.logger.log(`📥 Dữ liệu GỐC nhận được: ${JSON.stringify(value)}`);

    // Bước 1: Trim khoảng trắng thừa ở name
    if (value.name && typeof value.name === 'string') {
      value.name = value.name.trim();
      this.logger.log(`✂️  Sau khi trim name: "${value.name}"`);
    }

    // Bước 2: Nếu không có slug → tự tạo từ name
    if (!value.slug && value.name) {
      value.slug = this.generateSlug(value.name);
      this.logger.log(`🔄 Tự động tạo slug: "${value.slug}"`);
    }

    this.logger.log(`📤 Dữ liệu SAU KHI transform: ${JSON.stringify(value)}`);
    this.logger.log('========== AutoSlugPipe END ==========');

    return value; // Trả về value đã được biến đổi → chuyển tiếp cho Controller
  }

  /**
   * Chuyển tiếng Việt có dấu → slug không dấu
   * "Điện Thoại" → "dien-thoai"
   */
  private generateSlug(text: string): string {
    return text
      .toLowerCase()
      .normalize('NFD') // tách dấu ra: "ệ" → "e" + dấu
      .replace(/[\u0300-\u036f]/g, '') // xóa dấu
      .replace(/đ/g, 'd') // đ → d
      .replace(/[^a-z0-9\s-]/g, '') // xóa ký tự đặc biệt
      .replace(/\s+/g, '-') // khoảng trắng → dấu gạch ngang
      .replace(/-+/g, '-') // gộp nhiều dấu gạch ngang
      .replace(/^-+|-+$/g, ''); // xóa gạch ngang đầu/cuối
  }
}
