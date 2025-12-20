import { Body, Controller, Ip, Post, Res } from '@nestjs/common';
import { ReqRegisterDto } from './dto/reqRegisterDto';
import { MemberService } from './member.service';

@Controller('member')
export class MemberController {
  constructor(private readonly memberService: MemberService) {}
  @Post('login')
  login() {
    return 'login';
  }

  @Post('register')
  async register(@Body() reqRegisterDto: ReqRegisterDto, @Res() res) {
    const result = await this.memberService.register(reqRegisterDto);
    return res.status(201).json(result);
  }
}
