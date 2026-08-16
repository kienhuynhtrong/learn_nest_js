import { Controller, Get, Post, Body, Patch, Param, Delete, UsePipes, ParseIntPipe } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { AutoSlugPipe } from './pipes/auto-slug.pipe';

@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) { }

  // ✅ PIPE 2: Gắn custom AutoSlugPipe vào endpoint này
  // Luồng: Request → AutoSlugPipe (transform) → ValidationPipe (validate) → create()
  @Post()
  @UsePipes(AutoSlugPipe)
  create(@Body() createCategoryDto: CreateCategoryDto) {
    return this.categoryService.create(createCategoryDto);
  }

  @Get()
  findAll() {
    return this.categoryService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.categoryService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() updateCategoryDto: UpdateCategoryDto) {
    return this.categoryService.update(id, updateCategoryDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.categoryService.remove(id);
  }
}
