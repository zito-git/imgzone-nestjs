import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Req,
} from '@nestjs/common';
import { InfoService } from './info.service';
import { ReqPasswordChangeDto } from './dto/reqPasswordChangeDto';

@Controller('info')
export class InfoController {
  constructor(private readonly infoService: InfoService) {}

  @Get('mydata')
  @HttpCode(HttpStatus.OK)
  getMyInfo(@Req() req) {
    const uuid: string = req.user.id;
    return this.infoService.getMyInfo(uuid);
  }

  @Post('changePw')
  @HttpCode(HttpStatus.OK)
  changePassword(
    @Req() req,
    @Body() reqPasswordChangeDto: ReqPasswordChangeDto,
  ) {
    const uuid: string = req.user.id;
    const password: string = reqPasswordChangeDto.password;

    return this.infoService.changePassword(uuid, password);
  }
}
