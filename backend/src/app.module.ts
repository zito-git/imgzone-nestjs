import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { MemberModule } from './domain/member/member.module';
import { PrismaModule } from './prisma/prisma.module';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { PostModule } from './domain/post/post.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    ServeStaticModule.forRoot({
      rootPath: join(process.cwd(), '..', 'uploads'), // 업로드 폴더 경로
      serveRoot: '/uploads', // 브라우저에서 접근할
    }),
    MemberModule,
    PrismaModule,
    AuthModule,
    PostModule,
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
