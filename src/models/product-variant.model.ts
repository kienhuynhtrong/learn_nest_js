import { Table, Column, Model, DataType, ForeignKey, BelongsTo } from "sequelize-typescript";
import { Product } from "./product.model";

@Table({ tableName: 'product_variants' })
export class ProductVariant extends Model<ProductVariant> {
  @Column({
    allowNull: false,
    type: DataType.STRING,
  })
  name: string;

  @Column({
    type: DataType.ENUM('15cm', '20cm', '30cm'),
    defaultValue: '15cm',
  })
  size: string;

  @Column({
    type: DataType.ENUM('Mỏng', 'Bình thường', 'Dày'),
    defaultValue: 'Mỏng',
  })
  type: string;

  @Column({
    type: DataType.INTEGER,
    defaultValue: 0,
  })
  modifiedPrice: number;

  @Column({
    type: DataType.BOOLEAN,
    defaultValue: true,
  })
  isActive: boolean;

  @ForeignKey(() => Product)
  @Column({
    allowNull: false,
    type: DataType.INTEGER,
  })
  productId: number;

  @BelongsTo(() => Product)
  product: Product;
}
