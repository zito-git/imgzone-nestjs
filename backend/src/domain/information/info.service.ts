import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class InfoService {
  constructor(private readonly prisma: PrismaService) {}

  //멤버 정보 반환
  async getMyInfo(uuid: string) {
    const memberInfo = await this.prisma.member.findUniqueOrThrow({
      where: { uuid: uuid },
      include: { images: { orderBy: { id: 'desc' } } },
    });

    const result = {
      user: {
        id: memberInfo.userid,
        role: memberInfo.role,
        email: memberInfo.email,
      },
      post: memberInfo.images.map((images) => ({
        id: images.id.toString(),
        imgList: images.img.map((img: string) =>
          img.replace(/\.(jpg|jpeg|png|heic|heif)$/i, '.webp'),
        ),
        created: images.created,
      })),
    };

    return result;
  }

  async changePassword(uuid: string, password: string): Promise<void> {
    const bcrypt = require('bcrypt');
    const changedPw = await bcrypt.hash(password, 10);
    await this.prisma.member.update({
      where: { uuid: uuid },
      data: {
        password: changedPw,
      },
    });
  }
}
