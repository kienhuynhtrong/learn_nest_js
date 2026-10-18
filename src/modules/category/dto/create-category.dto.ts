import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsOptional, IsNotEmpty, IsNumber, IsBoolean } from 'class-validator';

export class CreateCategoryDto {
  @ApiProperty({
    example: 'Trà Sữa Trân Châu',
    description: 'Tên danh mục sản phẩm',
  })
  @IsNotEmpty({ message: 'Tên danh mục không được để trống' })
  @IsString()
  name: string;

  @ApiPropertyOptional({
    example: 1,
    description: 'Thứ tự hiển thị',
    default: 1,
  })
  @IsOptional()
  @IsNumber()
  sortOrder?: number;

  @ApiPropertyOptional({
    example: true,
    description: 'Trạng thái hoạt động của danh mục',
    default: true,
  })
  @IsOptional()
  @IsBoolean()
  isActive?: boolean;
}
