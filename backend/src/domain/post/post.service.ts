import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { Queue } from 'bullmq';
import { diskStorage } from 'multer';
import * as path from 'path';
import { PrismaService } from 'src/prisma/prisma.service';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class PostService {
  constructor(private readonly prisma: PrismaService) {}
  async save(fileArr: string[]) {
    try {
      await this.prisma.$transaction(async (tx) => {
        // 임시로 값 넣어둠 13
        await tx.images.create({ data: { img: fileArr, member_id: 13 } });
      });

      //큐 등록
      await myQueue.add(
        'job',
        { files: fileArr },
        { attempts: 5, removeOnComplete: 300 },
      );
    } catch {
      throw new InternalServerErrorException();
    }
    return fileArr;
  }
}

//큐 설정
export const myQueue = new Queue('images', {
  connection: {
    host: process.env.MY_URL,
    port: 6379,
  },
});

export const imageUploadOptions = {
  fileFilter: (req, file, cb) => {
    const allowed = ['.png', '.jpg', '.jpeg'];
    const ext = path.extname(file.originalname).toLowerCase();

    if (!allowed.includes(ext)) {
      return cb(
        new BadRequestException(`허용되지 않은 파일 형식입니다. (${ext})`),
        false,
      );
    }

    cb(null, true);
  },

  storage: diskStorage({
    destination: './uploads',
    filename: (req, file, cb) => {
      const ext = path.extname(file.originalname);
      cb(null, `${uuidv4()}${ext}`);
    },
  }),

  limits: { fileSize: 50 * 1024 * 1024 },
};
