import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { ReqRegisterDto } from './dto/reqRegisterDto';
import bcrypt from 'bcrypt';

@Injectable()
export class MemberService {
  constructor(private readonly prisma: PrismaService) {}

  async findByUserid(userid: string): Promise<void> {
    const result = await this.prisma.member.findUnique({ where: { userid } });
    // 아이디 존재 시 에러 반환
    if (result !== null) {
      throw new BadRequestException('존재하는 아이디입니다.');
    }
  }

  async register(reqRegisterDto: ReqRegisterDto) {
    await this.findByUserid(reqRegisterDto.userid);

    //비밀번호 암호화
    const password = await bcrypt.hash(reqRegisterDto.password, 10);
    reqRegisterDto.password = password;

    //DB 저장
    await this.prisma.member.create({ data: reqRegisterDto });

    return { message: '회원가입 완료' };
  }
}
