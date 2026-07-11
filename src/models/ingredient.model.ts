import { Table, Column, Model, DataType, ForeignKey, BelongsTo, BelongsToMany, HasMany } from "sequelize-typescript";
import { Category } from "./category.model";
import { Product } from "./product.model";
import { ProductIngredient } from "./product-ingredient.model";
import { OrderItem } from "./order-item.model";
import { OrderItemIngredient } from "./order-item-ingredient.model";

@Table({ tableName: 'ingredients' })
export class Ingredient extends Model<Ingredient> {
  @Column({
    allowNull: false,
    type: DataType.STRING,
  })
  name: string;

  @Column({
    allowNull: false,
    type: DataType.STRING,
  })
  imageUrl: string;

  @Column({
    type: DataType.TEXT,
  })
  description: string;

  @Column({
    type: DataType.INTEGER,
    defaultValue: 0,
  })
  price: number;

  @Column({
    type: DataType.BOOLEAN,
    defaultValue: true,
  })
  isActive: boolean;

  @Column({
    type: DataType.BOOLEAN,
    defaultValue: false,
  })
  isRequired: boolean;

  @ForeignKey(() => Category)
  @Column({
    allowNull: false,
    type: DataType.INTEGER,
  })
  categoryId: number;

  @BelongsTo(() => Category)
  category: Category;

  @BelongsToMany(() => Product, () => ProductIngredient)
  products: Product[];

  @BelongsToMany(() => OrderItem, () => OrderItemIngredient)
  orderItems: OrderItem[];

  @HasMany(() => OrderItemIngredient)
  orderItemIngredients: OrderItemIngredient[];
}
