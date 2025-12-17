import { Body, Controller, Get, Post } from '@nestjs/common';
import { ReqRegisterDto } from '../dto/req-register-dto';

@Controller('member')
export class MemberController {
  @Get('login')
  login() {
    return 'login';
  }

  @Post('register')
  register(@Body() ReqRegisterDto: ReqRegisterDto) {
    return ReqRegisterDto;
  }
}
