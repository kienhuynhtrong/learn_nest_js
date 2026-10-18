import { Type } from 'class-transformer';
import { IsString, IsOptional, IsBoolean, IsInt, IsNotEmpty, IsNumber } from 'class-validator';

export class CreateCategoryDto {
  @IsNotEmpty({ message: "Tên danh mục không được để trống" })
  @IsString()
  name: string;

  @IsOptional()
  @IsNumber()
  sortOrder?: number;

  @IsOptional()
  isActive?: boolean;
}
