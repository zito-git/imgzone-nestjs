import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from 'src/auth/auth.service';
import { JwtAuthGuard } from 'src/auth/jwt.auth.guard';
import { Public } from 'src/auth/public.decorator';
import { ReqLoginDto } from './dto/reqLoginDto';
import { ReqRegisterDto } from './dto/reqRegisterDto';
import { MemberService } from './member.service';

// @Roles(['ADMIN'])
@Controller('member')
export class MemberController {
  constructor(
    private readonly memberService: MemberService,
    private readonly authService: AuthService,
  ) {}

  @Public()
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

  @UseGuards(JwtAuthGuard)
  @Get('test')
  test() {
    return 'token ok';
  }
}
