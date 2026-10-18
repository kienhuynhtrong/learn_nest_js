import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiParam } from '@nestjs/swagger';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

@ApiTags('Categories')
@Controller('categories')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) { }

  @Post()
  @ApiOperation({ summary: 'Tạo mới danh mục' })
  create(@Body() createCategoryDto: CreateCategoryDto) {
    return this.categoryService.create(createCategoryDto);
  }

  @Get()
  @ApiOperation({ summary: 'Lấy danh sách tất cả danh mục đang hoạt động' })
  findAll() {
    return this.categoryService.findAll();
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Cập nhật danh mục theo ID' })
  @ApiParam({ name: 'id', description: 'ID của danh mục', example: 1 })
  update(@Param('id') id: string, @Body() updateCategoryDto: UpdateCategoryDto) {
    return this.categoryService.update(+id, updateCategoryDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Xóa danh mục theo ID' })
  @ApiParam({ name: 'id', description: 'ID của danh mục cần xóa', example: 1 })
  remove(@Param('id') id: string) {
    return this.categoryService.remove(+id);
  }
}
