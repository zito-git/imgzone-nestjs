import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { InfoService } from './service/info.service';
import { imageUploadOptions, UploadService } from './service/upload.service';

@Controller('post')
export class PostController {
  constructor(
    private readonly uploadService: UploadService,
    private readonly infoService: InfoService,
  ) {}

  //파일 업로드
  @HttpCode(HttpStatus.OK)
  @Post('upload')
  @UseInterceptors(FilesInterceptor('files', 10, imageUploadOptions))
  uploadFile(@UploadedFiles() files: Array<Express.Multer.File>) {
    const fileArr: string[] = files.map((file) => file.filename);

    console.log(files);
    return this.uploadService.save(fileArr);
  }

  @Get('info')
  getMyInfo(@Req() req) {
    const uuid: string = req.user.id;
    return this.infoService.getMyInfo(uuid);
  }
}
