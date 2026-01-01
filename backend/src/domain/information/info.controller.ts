import { Controller, Get, HttpCode, HttpStatus, Req } from '@nestjs/common';
import { InfoService } from './info.service';

@Controller('info')
export class InfoController {
  constructor(private readonly infoService: InfoService) {}

  @Get('mydata')
  @HttpCode(HttpStatus.OK)
  getMyInfo(@Req() req) {
    const uuid: string = req.user.id;
    return this.infoService.getMyInfo(uuid);
  }
}
