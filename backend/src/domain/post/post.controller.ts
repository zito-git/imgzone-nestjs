import {
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { imageUploadOptions, UploadService } from './service/upload.service';

@Controller('post')
export class PostController {
  constructor(private readonly uploadService: UploadService) {}

  //파일 업로드
  @HttpCode(HttpStatus.OK)
  @Post('upload')
  @UseInterceptors(FilesInterceptor('files', 10, imageUploadOptions))
  uploadFile(@UploadedFiles() files: Array<Express.Multer.File>, @Req() req) {
    const fileArr: string[] = files.map((file) => file.filename);

    console.log(files);
    const uuid: string = req.user.id;
    return this.uploadService.save(fileArr, uuid);
  }
}
