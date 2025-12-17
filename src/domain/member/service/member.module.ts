import { Module } from '@nestjs/common';
import { MemberController } from '../controller/member.controller';
import { Member } from '../member';

@Module({
  controllers: [MemberController],
  providers: [Member],
})
export class MemberModule {}
