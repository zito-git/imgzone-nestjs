import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { MemberModule } from './domain/member/member.module';

@Module({
  imports: [MemberModule],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
