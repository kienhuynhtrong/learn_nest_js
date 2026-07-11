import { Table, Column, Model, DataType, HasMany, HasOne } from "sequelize-typescript";
import { Address } from "./address.model";
import { Order } from "./order.model";
import { Carts } from "./carts.model";
import { UserCoupon } from "./user-coupon.model";
import { Review } from "./review.model";

@Table({ tableName: 'users' })
export class User extends Model<User> {
  @Column({
    allowNull: false,
    unique: true,
    type: DataType.STRING
  })
  email: string;

  @Column({
    allowNull: false,
    type: DataType.STRING
  })
  password: string;

  @Column({
    allowNull: false,
    type: DataType.STRING,
  })
  name: string;

  @Column({
    allowNull: true,
    type: DataType.STRING,
  })
  avatar: string;

  @Column({
    type: DataType.STRING,
  })
  phone: string;

  @Column({
    type: DataType.ENUM('CUSTOMER', 'ADMIN'),
    defaultValue: 'CUSTOMER',
  })
  role: string;

  @Column({
    type: DataType.STRING,
  })
  provider: string;

  @HasMany(() => Address)
  addresses: Address[];

  @HasMany(() => Order)
  orders: Order[];

  @HasOne(() => Carts)
  cart: Carts;

  @HasMany(() => UserCoupon)
  userCoupons: UserCoupon[];

  @HasMany(() => Review)
  reviews: Review[];
}
