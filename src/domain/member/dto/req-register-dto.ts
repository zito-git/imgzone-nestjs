import { IsEmail, IsNotEmpty, Length } from 'class-validator';

export class ReqRegisterDto {
  @IsNotEmpty()
  @Length(4, 20)
  userid: string;

  @IsNotEmpty()
  password: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  nickname: string;
}
