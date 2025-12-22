import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { ReqRegisterDto } from './dto/reqRegisterDto';

@Injectable()
export class MemberService {
  constructor(private readonly prisma: PrismaService) {}

  // 회원가입 시  아이디 중복 조회
  async registerFindUserid(userid: string): Promise<void> {
    const result = await this.prisma.member.findUnique({ where: { userid } });
    // 아이디 존재 시 에러 반환
    if (result !== null) {
      throw new BadRequestException('존재하는 아이디입니다.');
    }
  }

  //회원가입 메인 로직
  async register(reqRegisterDto: ReqRegisterDto): Promise<object> {
    await this.registerFindUserid(reqRegisterDto.userid);

    //비밀번호 암호화
    const salt: number = 10;
    const bcrypt = require('bcrypt');
    const password = await bcrypt.hash(reqRegisterDto.password, salt);
    reqRegisterDto.password = password;

    //DB 저장
    await this.prisma.member.create({ data: reqRegisterDto });

    const message = { message: '회원가입 완료' };
    return message;
  }
}
