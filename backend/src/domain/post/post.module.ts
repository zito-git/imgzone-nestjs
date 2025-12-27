import { Module } from '@nestjs/common';
import { PostController } from './post.controller';
import { UploadService } from './service/upload.service';
import { GetPostService } from './service/get-post.service';

@Module({
  controllers: [PostController],
  providers: [UploadService, GetPostService],
  exports: [GetPostService],
})
export class PostModule {}
