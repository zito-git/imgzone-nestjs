import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Query,
} from '@nestjs/common';
import { AuthService } from 'src/auth/auth.service';
import { Public } from 'src/auth/decorator/public.decorator';
import { GetPostService } from '../post/service/get-post.service';
import { ReqLoginDto } from './dto/reqLoginDto';
import { ReqRegisterDto } from './dto/reqRegisterDto';
import { MemberService } from './member.service';

@Public()
@Controller('member')
export class MemberController {
  constructor(
    private readonly memberService: MemberService,
    private readonly authService: AuthService,
    private readonly getPostService: GetPostService,
  ) {}

  @HttpCode(HttpStatus.OK)
  @Post('login')
  async login(@Body() reqLoginDto: ReqLoginDto) {
    const result = await this.authService.login(reqLoginDto);
    return result;
  }

  @HttpCode(HttpStatus.CREATED)
  @Post('register')
  async register(@Body() reqRegisterDto: ReqRegisterDto) {
    const result = await this.memberService.register(reqRegisterDto);
    return result;
  }

  @HttpCode(HttpStatus.OK)
  @Get('get-post')
  getLoadPost(@Query('cursor') cursor: string, @Query('size') size: string) {
    return this.getPostService.getImagePost({
      cursor,
      size: size ? Number(size) : 20,
    });
  }
}
