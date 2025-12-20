import { IsNotEmpty } from 'class-validator';

export class ReqLoginDto {
  @IsNotEmpty()
  userid: string;

  @IsNotEmpty()
  password: string;
}
