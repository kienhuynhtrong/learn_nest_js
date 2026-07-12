import { Table, Column, Model, DataType, HasMany } from "sequelize-typescript";
import { UserCoupon } from "./user-coupon.model";

@Table({ tableName: 'coupons' })
export class Coupon extends Model<Coupon> {
  @Column({
    allowNull: false,
    unique: true,
    type: DataType.STRING,
  })
  code: string;

  @Column({
    allowNull: false,
    type: DataType.STRING,
  })
  name: string;

  @Column({
    type: DataType.TEXT,
  })
  description: string;

  @Column({
    allowNull: false,
    type: DataType.ENUM('fixed', 'percentage'),
  })
  type: string;

  @Column({
    allowNull: false,
    type: DataType.INTEGER,
  })
  value: number;

  @Column({
    type: DataType.INTEGER,
    defaultValue: 0,
  })
  minOrderAmount: number;

  @Column({
    type: DataType.INTEGER,
    defaultValue: 1,
  })
  maxUses: number;

  @Column({
    type: DataType.INTEGER,
    defaultValue: 0,
  })
  currentUses: number;

  @Column({
    allowNull: false,
    type: DataType.DATE,
  })
  validFrom: Date;

  @Column({
    allowNull: false,
    type: DataType.DATE,
  })
  validTo: Date;

  @Column({
    type: DataType.BOOLEAN,
    defaultValue: true,
  })
  isActive: boolean;

  @HasMany(() => UserCoupon)
  userCoupons: UserCoupon[];
}
