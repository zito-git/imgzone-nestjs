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

export class ChangeStatusDto {
  postId: Number;
  status: string;
}

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

  @Post('changeStatus')
  @HttpCode(HttpStatus.OK)
  changeStatus(@Body() changeStatusDto: ChangeStatusDto) {
    return this.infoService.myStatusChange(changeStatusDto);
  }
}
