import { ConfigService } from "@nestjs/config";
import { SequelizeModuleOptions } from "@nestjs/sequelize";
import { User, Category, Product, ProductVariant, Ingredient, ProductIngredient } from "@/models";

export const squalizeConfig = (configService: ConfigService): SequelizeModuleOptions => {
  return {
    dialect: 'postgres',
    host: configService.get<string>('DB_HOST'),
    port: configService.get<number>('DB_PORT'),
    username: configService.get<string>('DB_USERNAME'),
    password: configService.get<string>('DB_PASSWORD'),
    database: configService.get<string>('DB_DATABASE'),
    synchronize: true,
    autoLoadModels: true,
    logging: false,
    models: [
      User,
      Category,
      Product,
      ProductVariant,
      Ingredient,
      ProductIngredient
    ]
  }
}