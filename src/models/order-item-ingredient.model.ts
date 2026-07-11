import { Table, Column, Model, DataType, ForeignKey, BelongsTo } from "sequelize-typescript";
import { OrderItem } from "./order-item.model";
import { Ingredient } from "./ingredient.model";

@Table({ tableName: 'order_item_ingredients' })
export class OrderItemIngredient extends Model<OrderItemIngredient> {
  @ForeignKey(() => OrderItem)
  @Column({
    allowNull: false,
    type: DataType.INTEGER,
  })
  orderItemId: number;

  @BelongsTo(() => OrderItem)
  orderItem: OrderItem;

  @ForeignKey(() => Ingredient)
  @Column({
    allowNull: false,
    type: DataType.INTEGER,
  })
  ingredientId: number;

  @BelongsTo(() => Ingredient)
  ingredient: Ingredient;

  @Column({
    type: DataType.INTEGER,
    defaultValue: 1,
  })
  quantity: number;
}
