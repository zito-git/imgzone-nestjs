import { Module } from '@nestjs/common';
import { PostController } from './post.controller';
import { UploadService } from './service/upload.service';
import { GetPostService } from './service/get-post.service';
import { InfoService } from './service/info.service';

@Module({
  controllers: [PostController],
  providers: [UploadService, GetPostService, InfoService],
  exports: [GetPostService],
})
export class PostModule {}
