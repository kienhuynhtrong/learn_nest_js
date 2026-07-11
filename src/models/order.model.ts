import { Table, Column, Model, DataType, ForeignKey, BelongsTo, HasMany } from "sequelize-typescript";
import { User } from "./user.model";
import { Address } from "./address.model";
import { OrderItem } from "./order-item.model";
import { Review } from "./review.model";

@Table({ tableName: 'orders' })
export class Order extends Model<Order> {
  @Column({
    allowNull: false,
    unique: true,
    type: DataType.STRING,
  })
  orderNumber: string;

  @Column({
    type: DataType.ENUM('Đang chờ', 'Xác nhận', 'Đang giao', 'Hoàn thành', 'Đã huỷ'),
    defaultValue: 'Đang chờ',
  })
  status: string;

  @Column({
    type: DataType.ENUM('Chưa thanh toán', 'Đã thanh toán', 'Thất bại', 'Hoàn tiền'),
    defaultValue: 'Chưa thanh toán',
  })
  paymentStatus: string;

  @Column({
    type: DataType.ENUM('COD', 'Chuyển khoản', 'Thẻ tín dụng', 'Ví điện tử'),
    defaultValue: 'COD',
  })
  paymentMethod: string;

  @Column({
    type: DataType.INTEGER,
  })
  subTotal: number;

  @Column({
    type: DataType.INTEGER,
  })
  deliveryFee: number;

  @Column({
    type: DataType.INTEGER,
  })
  discount: number;

  @Column({
    type: DataType.INTEGER,
  })
  total: number;

  @Column({
    type: DataType.TEXT,
  })
  notes: string;

  @ForeignKey(() => User)
  @Column({
    allowNull: false,
    type: DataType.INTEGER,
  })
  userId: number;

  @BelongsTo(() => User)
  user: User;

  @ForeignKey(() => Address)
  @Column({
    allowNull: false,
    type: DataType.INTEGER,
  })
  addressId: number;

  @BelongsTo(() => Address)
  address: Address;

  @HasMany(() => OrderItem)
  orderItems: OrderItem[];

  @HasMany(() => Review)
  reviews: Review[];
}
