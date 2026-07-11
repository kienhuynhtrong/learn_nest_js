import { Table, Column, Model, DataType, ForeignKey, BelongsTo } from "sequelize-typescript";
import { Carts } from "./carts.model";
import { Product } from "./product.model";
import { ProductVariant } from "./product-variant.model";

@Table({ tableName: 'cart_items' })
export class CartItem extends Model<CartItem> {
  @Column({
    type: DataType.INTEGER,
    defaultValue: 1,
  })
  quantity: number;

  @ForeignKey(() => Carts)
  @Column({
    allowNull: false,
    type: DataType.INTEGER,
  })
  cartId: number;

  @BelongsTo(() => Carts)
  cart: Carts;

  @ForeignKey(() => Product)
  @Column({
    allowNull: false,
    type: DataType.INTEGER,
  })
  productId: number;

  @BelongsTo(() => Product)
  product: Product;

  @ForeignKey(() => ProductVariant)
  @Column({
    type: DataType.INTEGER,
  })
  variantId: number;

  @BelongsTo(() => ProductVariant)
  variant: ProductVariant;
}
