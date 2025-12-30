import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class InfoService {
  constructor(private readonly prisma: PrismaService) {}

  async getMyInfo(uuid: string) {
    const memberInfo = await this.prisma.member.findFirstOrThrow({
      where: { uuid: uuid },
    });

    const memberId = Number(memberInfo.id);
    const result = await this.prisma.images.findMany({
      where: { member_id: memberId },
    });

    return result.map((img) => ({
      id: img.id.toString(),
      imgList: img.img,
      created: img.created,
    }));
  }
}
