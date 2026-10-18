import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Category } from '../../models/category.model';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Helper } from '../../common/utils/helper';

@Injectable()
export class CategoryService {
  constructor(
    @InjectModel(Category) private categoryModel: typeof Category,
  ) { }

  async create(createCategoryDto: CreateCategoryDto) {
    const slug = Helper.makeSlug(createCategoryDto.name);
    const isExist = await this.categoryModel.findOne({ where: { slug } });

    if (isExist) {
      throw new BadRequestException('Danh mục này đã tồn tại!');
    }

    const createPayload = {
      ...createCategoryDto,
      slug,
    };

    await this.categoryModel.create(createPayload as any);
    return { message: 'Danh mục đã được tạo thành công' };
  }

  async findAll() {
    return await this.categoryModel.findAll({
      where: { isActive: true }, // Chỉ lấy danh mục đang active
      order: [['sortOrder', 'ASC']], // Sắp xếp theo order tăng dần
      attributes: { exclude: ['createdAt', 'updatedAt'] }, // Bỏ các trường thừa
    });
  }

  async update(id: number, updateCategoryDto: UpdateCategoryDto) {
    // Phải lấy instance thật ra để Sequelize Hook (@BeforeUpdate) có thể chạy được
    const category = await this.categoryModel.findByPk(id);

    if (!category) {
      throw new NotFoundException('Không tìm thấy danh mục!');
    }

    await category.update(updateCategoryDto);
    return { message: 'Cập nhật danh mục thành công', data: category };
  }

  async remove(id: number) {
    // Xóa cứng (Hard Delete) - Hoặc bạn có thể update isActive = false nếu muốn xóa mềm
    const deletedCount = await this.categoryModel.destroy({
      where: { id },
      cascade: true // Tùy chọn xóa các dữ liệu liên kết nếu có
    });

    if (deletedCount === 0) {
      throw new NotFoundException('Không tìm thấy danh mục để xóa!');
    }

    return { message: 'Xóa danh mục thành công' };
  }
}