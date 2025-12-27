import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { ImagesEntityToDto } from '../images-entity-to-dto';

@Injectable()
export class GetPostService {
  constructor(private readonly prisma: PrismaService) {}
  async getImagePost({ cursor, size }: { cursor?: string; size: number }) {
    const take = size + 1; // 다음 페이지 존재 여부 판단용

    const images = await this.prisma.images.findMany({
      take: take,
      cursor: cursor ? { id: BigInt(cursor) } : undefined,
      skip: cursor ? 1 : 0, // 커서 행 제거
      orderBy: { id: 'desc' },
      include: { member: true },
    });

    const hasNext = images.length > size;
    const data = hasNext ? images.slice(0, size) : images;

    const nextCursor = hasNext ? data[data.length - 1].id.toString() : null;

    return {
      post: data.map((img) => new ImagesEntityToDto(img)),
      pageInfo: {
        nextCursor,
        hasNext,
      },
    };
  }
}
