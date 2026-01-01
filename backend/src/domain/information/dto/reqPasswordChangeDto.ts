import { IsNotEmpty, IsString } from 'class-validator';

export class ReqPasswordChangeDto {
  @IsString()
  @IsNotEmpty()
  password: string;
}
