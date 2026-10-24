import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { User } from '@/models';
import { SequelizeModule } from '@nestjs/sequelize';


@Module({
  controllers: [UserController],
  providers: [UserService],
  imports: [SequelizeModule.forFeature([User])],
  exports: [UserService],
})
export class UserModule { }
