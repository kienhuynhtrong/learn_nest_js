import { Table, Column, Model, DataType } from "sequelize-typescript";

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
}
