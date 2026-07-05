import { Table, Column, Model, DataType, HasMany } from "sequelize-typescript";
import { Product } from "./product.model";

@Table({ tableName: 'categories' })
export class Category extends Model<Category> {
  @Column({
    allowNull: false,
    unique: true,
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
    type: DataType.INTEGER,
    defaultValue: 0,
  })
  sortOrder: number;

  @Column({
    type: DataType.BOOLEAN,
    defaultValue: true,
  })
  isActive: boolean;

  @HasMany(() => Product)
  products: Product[];
}
