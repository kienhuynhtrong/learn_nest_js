import { Table, Column, Model, DataType, ForeignKey, BelongsTo } from "sequelize-typescript";
import { User } from "./user.model";
import { Coupon } from "./coupon.model";

@Table({ tableName: 'user_coupons' })
export class UserCoupon extends Model<UserCoupon> {
  @Column({
    type: DataType.BOOLEAN,
    defaultValue: false,
  })
  isUsed: boolean;

  @Column({
    type: DataType.DATE,
  })
  usedAt: Date;

  @ForeignKey(() => User)
  @Column({
    allowNull: false,
    type: DataType.INTEGER,
  })
  userId: number;

  @BelongsTo(() => User)
  user: User;

  @ForeignKey(() => Coupon)
  @Column({
    allowNull: false,
    type: DataType.INTEGER,
  })
  couponId: number;

  @BelongsTo(() => Coupon)
  coupon: Coupon;
}
