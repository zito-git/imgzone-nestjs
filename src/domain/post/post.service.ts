import { BadRequestException, Injectable } from '@nestjs/common';
import { diskStorage } from 'multer';
import * as path from 'path';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class PostService {}

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
