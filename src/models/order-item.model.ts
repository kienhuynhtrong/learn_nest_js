import { Table, Column, Model, DataType, ForeignKey, BelongsTo, BelongsToMany, HasMany } from "sequelize-typescript";
import { Order } from "./order.model";
import { Product } from "./product.model";
import { ProductVariant } from "./product-variant.model";
import { Ingredient } from "./ingredient.model";
import { OrderItemIngredient } from "./order-item-ingredient.model";

@Table({ tableName: 'order_items' })
export class OrderItem extends Model<OrderItem> {
  @ForeignKey(() => Order)
  @Column({
    allowNull: false,
    type: DataType.INTEGER,
  })
  orderId: number;

  @BelongsTo(() => Order)
  order: Order;

  @ForeignKey(() => Product)
  @Column({
    allowNull: false,
    type: DataType.INTEGER,
  })
  productId: number;

  @BelongsTo(() => Product)
  product: Product;

  @Column({
    type: DataType.INTEGER,
    defaultValue: 1,
  })
  quantity: number;

  @ForeignKey(() => ProductVariant)
  @Column({
    type: DataType.INTEGER,
  })
  variantId: number;

  @BelongsTo(() => ProductVariant)
  variant: ProductVariant;

  @BelongsToMany(() => Ingredient, () => OrderItemIngredient)
  ingredients: Ingredient[];

  @HasMany(() => OrderItemIngredient)
  orderItemIngredients: OrderItemIngredient[];
}
