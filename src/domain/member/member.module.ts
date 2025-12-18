import { Module } from '@nestjs/common';
import { MemberController } from './controller/member.controller';

@Module({
  controllers: [MemberController],
})
export class MemberModule {}
