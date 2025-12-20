import { Body, Controller, HttpStatus, Post, Res } from '@nestjs/common';
import { ReqRegisterDto } from './dto/reqRegisterDto';
import { MemberService } from './member.service';
import { ReqLoginDto } from './dto/reqLoginDto';

@Controller('member')
export class MemberController {
  constructor(private readonly memberService: MemberService) {}
  @Post('login')
  async login(@Body() reqLoginDto: ReqLoginDto, @Res() res) {
    const result = await this.memberService.login(reqLoginDto);
    return res.status(HttpStatus.OK).json(result);
  }

  @Post('register')
  async register(@Body() reqRegisterDto: ReqRegisterDto, @Res() res) {
    const result = await this.memberService.register(reqRegisterDto);
    return res.status(HttpStatus.CREATED).json(result);
  }
}
