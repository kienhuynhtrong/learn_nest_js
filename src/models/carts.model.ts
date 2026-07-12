import { Table, Column, Model, DataType, ForeignKey, BelongsTo, HasMany } from "sequelize-typescript";
import { User } from "./user.model";
import { CartItem } from "./cart-item.model";

@Table({ tableName: 'carts' })
export class Carts extends Model<Carts> {
  @ForeignKey(() => User)
  @Column({
    allowNull: false,
    type: DataType.INTEGER,
  })
  userId: number;

  @BelongsTo(() => User)
  user: User;

  @HasMany(() => CartItem)
  cartItems: CartItem[];
}
