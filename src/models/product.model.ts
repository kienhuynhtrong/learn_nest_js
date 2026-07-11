import { Table, Column, Model, DataType, ForeignKey, BelongsTo, HasMany, BelongsToMany } from "sequelize-typescript";
import { Category } from "./category.model";
import { ProductVariant } from "./product-variant.model";
import { Ingredient } from "./ingredient.model";
import { ProductIngredient } from "./product-ingredient.model";
import { OrderItem } from "./order-item.model";
import { CartItem } from "./cart-item.model";
import { Review } from "./review.model";

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

  @BelongsToMany(() => Ingredient, () => ProductIngredient)
  ingredients: Ingredient[];

  @HasMany(() => OrderItem)
  orderItems: OrderItem[];

  @HasMany(() => CartItem)
  cartItems: CartItem[];

  @HasMany(() => Review)
  reviews: Review[];
}