import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { MemberModule } from './domain/member/member.module';
import { PrismaModule } from './prisma/prisma.module';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { PostModule } from './domain/post/post.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    MemberModule,
    PrismaModule,
    AuthModule,
    PostModule,
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
