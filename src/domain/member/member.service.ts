import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { ReqRegisterDto } from './dto/reqRegisterDto';
import bcrypt from 'bcrypt';
import { ReqLoginDto } from './dto/reqLoginDto';
import { member } from 'generated/prisma/client';

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

  //로그인 시 아이디 존재하는지 확인
  async loginFindMember(userid: string): Promise<member> {
    const result = await this.prisma.member.findUnique({
      where: { userid: userid },
    });

    if (result === null) {
      // 아이디 틀림
      throw new BadRequestException('아이디 또는 비밀번호를 확인해주세요');
    }

    return result;
  }

  //회원가입 로직
  async register(reqRegisterDto: ReqRegisterDto) {
    await this.registerFindUserid(reqRegisterDto.userid);

    //비밀번호 암호화
    const salt: number = 10;
    const password = await bcrypt.hash(reqRegisterDto.password, salt);
    reqRegisterDto.password = password;

    //DB 저장
    await this.prisma.member.create({ data: reqRegisterDto });

    return { message: '회원가입 완료' };
  }

  // 로그인 로직
  async login(reqLoginDto: ReqLoginDto) {
    const memberData = await this.loginFindMember(reqLoginDto.userid);
    const dbPassword = memberData.password;
    const reqPassword = reqLoginDto.password;

    // 비밀번호 확인
    const passwordResult = await bcrypt.compare(reqPassword, dbPassword);
    if (passwordResult === false) {
      // 비밀번호 틀림
      throw new BadRequestException('아이디 또는 비밀번호를 확인해주세요');
    }

    return passwordResult;
  }
}
