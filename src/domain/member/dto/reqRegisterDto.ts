import { IsNotEmpty } from 'class-validator';

export class ReqRegisterDto {
  @IsNotEmpty()
  userid: string;

  @IsNotEmpty()
  password: string;

  @IsNotEmpty()
  email: string;
}
