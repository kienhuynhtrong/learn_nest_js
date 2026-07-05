import { Table, Column, Model, DataType, ForeignKey, BelongsTo, HasMany } from "sequelize-typescript";
import { Category } from "./category.model";
import { ProductVariant } from "./product-variant.model";

@Table({ tableName: 'products' })
export class Product extends Model<Product> {
  @Column({
    allowNull: false,
    type: DataType.STRING,
  })
  name: string;

  @Column({
    allowNull: false,
    unique: true,
    type: DataType.STRING,
  })
  slug: string;

  @Column({
    type: DataType.TEXT,
  })
  description: string;

  @Column({
    allowNull: false,
    type: DataType.INTEGER,
  })
  basePrice: number;

  @Column({
    allowNull: false,
    type: DataType.STRING,
  })
  imageUrl: string;

  @Column({
    type: DataType.BOOLEAN,
    defaultValue: true,
  })
  isActive: boolean;

  @Column({
    type: DataType.BOOLEAN,
    defaultValue: false,
  })
  isFeatured: boolean;

  @ForeignKey(() => Category)
  @Column({
    allowNull: false,
    type: DataType.INTEGER,
  })
  categoryId: number;

  @BelongsTo(() => Category)
  category: Category;

  @HasMany(() => ProductVariant)
  productVariants: ProductVariant[];
}