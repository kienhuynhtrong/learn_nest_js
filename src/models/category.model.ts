import { Table, Column, Model, DataType, BeforeValidate, BeforeCreate, BeforeUpdate } from 'sequelize-typescript';
import { Helper } from '../common/utils/helper';

@Table({ tableName: 'categories' })
export class Category extends Model<Category> {
  @Column({ type: DataType.STRING, allowNull: false })
  name: string;

  @Column({ type: DataType.STRING, unique: true })
  slug: string;

  @Column({ type: DataType.INTEGER, defaultValue: 1 })
  sortOrder: number;

  @Column({ type: DataType.BOOLEAN, defaultValue: true })
  isActive: boolean;

  // Tự động tạo slug trước khi tạo mới (Create)
  @BeforeValidate
  @BeforeCreate
  static createSlug(instance: Category) {
    if (instance.name && !instance.slug) {
      instance.slug = Helper.makeSlug(instance.name);
    }
  }

  // Tự động cập nhật slug khi update tên (Update)
  @BeforeUpdate
  static updateSlug(instance: Category) {
    if (instance.changed('name')) {
      instance.slug = Helper.makeSlug(instance.name);
    }
  }
}