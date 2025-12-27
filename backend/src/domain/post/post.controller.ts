import {
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { Public } from 'src/auth/decorator/public.decorator';
import { imageUploadOptions, UploadService } from './service/upload.service';

// @Public()
@Controller('post')
export class PostController {
  constructor(private readonly uploadService: UploadService) {}

  //파일 업로드
  @HttpCode(HttpStatus.OK)
  @Post('upload')
  @UseInterceptors(FilesInterceptor('files', 10, imageUploadOptions))
  uploadFile(@UploadedFiles() files: Array<Express.Multer.File>) {
    const fileArr: string[] = files.map((file) => file.filename);

    console.log(files);
    return this.uploadService.save(fileArr);
  }
}
