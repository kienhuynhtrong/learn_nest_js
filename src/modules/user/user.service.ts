import { BadRequestException, Injectable } from '@nestjs/common';
import { User } from '@/models';
import { InjectModel } from '@nestjs/sequelize';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User)
    private readonly userModel: typeof User,
  ) { }

  async findByEMail(email: string) {
    return await this.userModel.findOne({ where: { email } });
  }

  // Hàm tiện ích băm mật khẩu khi tạo hoặc đổi mật khẩu user
  async hashPassword(password: string): Promise<string> {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
  }

  // Hàm xác thực thông tin đăng nhập
  async validateUser(email: string, password: string) {
    const user = await this.findByEMail(email);
    if (!user) {
      throw new BadRequestException('Người dùng không tồn tại!');
    }

    // So sánh mật khẩu người dùng nhập vào với mật khẩu đã băm trong database
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw new BadRequestException('Mật khẩu không chính xác!');
    }

    // Loại bỏ mật khẩu trước khi trả về thông tin user
    const { password: _, ...result } = user.get({ plain: true });
    return result;
  }
}

