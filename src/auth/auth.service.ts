import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { access } from 'fs';
import { member } from 'generated/prisma/client';
import { ReqLoginDto } from 'src/domain/member/dto/reqLoginDto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
  ) {}

  //로그인 시 아이디 존재하는지 확인
  async loginFindMember(userid: string): Promise<member> {
    const result = await this.prisma.member.findUnique({
      where: { userid: userid },
    });

    if (result === null) {
      // 아이디 틀림
      throw new UnauthorizedException('아이디 또는 비밀번호를 확인해주세요');
    }

    return result;
  }

  // 로그인 메인 로직 + jwt 발급
  async login(reqLoginDto: ReqLoginDto): Promise<object> {
    const memberData = await this.loginFindMember(reqLoginDto.userid);
    const dbPassword = memberData.password;
    const reqPassword = reqLoginDto.password;

    // 비밀번호 확인
    const bcrypt = require('bcrypt');
    const passwordResult = await bcrypt.compare(reqPassword, dbPassword);
    if (passwordResult === false) {
      // 비밀번호 틀림
      throw new UnauthorizedException('아이디 또는 비밀번호를 확인해주세요');
    }

    const payload = { id: memberData.uuid, role: memberData.role };
    const message = {
      access_token: 'Bearer ' + (await this.jwtService.signAsync(payload)),
    };

    return message;
  }
}
