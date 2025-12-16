import { Controller, Get, Post } from '@nestjs/common';

@Controller('member')
export class MemberController {
  @Post('login')
  login() {
    return 'login';
  }

  @Post('join')
  join() {
    return 'sdfsdf';
  }
}
