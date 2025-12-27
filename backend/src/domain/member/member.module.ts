import { Module } from '@nestjs/common';
import { AuthModule } from 'src/auth/auth.module';
import { PostModule } from '../post/post.module';
import { MemberController } from './member.controller';
import { MemberService } from './member.service';

@Module({
  imports: [AuthModule, PostModule],
  controllers: [MemberController],
  providers: [MemberService],
  exports: [MemberService],
})
export class MemberModule {}
