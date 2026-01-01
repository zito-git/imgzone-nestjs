import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { ChangeStatusDto } from './info.controller';

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
        status: images.status,
        created: images.created,
      })),
    };

    return result;
  }

  //비밀번호 변경
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

  // 공개 및 비공개 관리
  async myStatusChange(statusDto: ChangeStatusDto): Promise<void> {
    const id = Number(statusDto.postId);
    console.log(statusDto.status);
    const status = String(statusDto.status) === 'true' ? true : false;
    console.log(status);

    await this.prisma.images.update({
      where: { id: id },
      data: { status: status },
    });
  }
}
