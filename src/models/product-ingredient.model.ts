import { Table, Column, Model, DataType, ForeignKey, BelongsTo } from "sequelize-typescript";
import { Product } from "./product.model";
import { Ingredient } from "./ingredient.model";

@Table({ tableName: 'product_ingredients' })
export class ProductIngredient extends Model<ProductIngredient> {
  @ForeignKey(() => Product)
  @Column({
    allowNull: false,
    type: DataType.INTEGER,
  })
  productId: number;

  @BelongsTo(() => Product)
  product: Product;

  @ForeignKey(() => Ingredient)
  @Column({
    allowNull: false,
    type: DataType.INTEGER,
  })
  ingredientId: number;

  @BelongsTo(() => Ingredient)
  ingredient: Ingredient;

  @Column({
    allowNull: false,
    type: DataType.BOOLEAN,
  })
  isDefault: boolean;

  @Column({
    type: DataType.INTEGER,
  })
  quantity: number;
}
