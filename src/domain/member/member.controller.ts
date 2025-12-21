import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
} from '@nestjs/common';
import { AuthService } from 'src/auth/auth.service';
import { Roles } from 'src/auth/roles.decorator';
import { ReqLoginDto } from './dto/reqLoginDto';
import { ReqRegisterDto } from './dto/reqRegisterDto';
import { MemberService } from './member.service';

@Roles(['ADMIN'])
@Controller('member')
export class MemberController {
  constructor(
    private readonly memberService: MemberService,
    private readonly authService: AuthService,
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

  @Get('test')
  test() {
    return 'token ok';
  }
}
