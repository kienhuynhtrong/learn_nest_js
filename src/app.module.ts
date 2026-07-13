import { Module } from '@nestjs/common';
import { SequelizeModule, SequelizeModuleOptions } from '@nestjs/sequelize';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { squalizeConfig } from './config/squalize.config';
import { UserModule } from './modules/user/user.module';
import { CategoryModule } from './modules/category/category.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // Để sử dụng ConfigService ở mọi nơi mà không cần import lại ConfigModule
    }),
    SequelizeModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService): SequelizeModuleOptions => (
        squalizeConfig(configService)
      ),
      inject: [ConfigService],
    }),
    UserModule,
    CategoryModule,
  ]
})
export class AppModule { }
