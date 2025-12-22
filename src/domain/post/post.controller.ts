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
import { imageUploadOptions, PostService } from './post.service';

@Public()
@Controller('post')
export class PostController {
  constructor(private readonly postService: PostService) {}
  @HttpCode(HttpStatus.OK)
  @Post('upload')
  @UseInterceptors(FilesInterceptor('files', 10, imageUploadOptions))
  uploadFile(@UploadedFiles() files: Array<Express.Multer.File>) {
    return files.map((file) => file.filename);
  }
}
