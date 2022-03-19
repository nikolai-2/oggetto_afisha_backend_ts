import {
  Body,
  Controller,
  Get,
  HttpCode,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guard/jwt-auth.guard';
import { ChannelListResponse } from './dto/channel-item-response.dto';
import { ChannelService } from './channel.service';
import { UserFromReq } from '../auth/decorator/user.decorator';
import { User } from '../user/type/user.type';
import { ChannelCreateRequest } from './dto/channel-create-request.dto';
import { ChannelResponse } from './dto/channel-response.dto';
import { ChannelInfoResponse } from './dto/channel-info-response.dto';

@Controller('channel')
@ApiTags('CHANNEL')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class ChannelController {
  constructor(private readonly channelService: ChannelService) {}
  /**
   * Return Channel list for authed player
   */
  @Get('list')
  public async list(): Promise<ChannelListResponse[]> {
    return this.channelService.getList();
  }

  /**
   * Return full Channel info
   */
  @Get(':id')
  public async get(
    @Param('id') id: string,
    @UserFromReq() user: User,
  ): Promise<ChannelInfoResponse> {
    const { users, ...data } = await this.channelService.getByIdWithUsers(
      parseInt(id),
    );
    return {
      ...data,
      users: {
        count: users.length,
        avatars: users.map((user) => user.avatar).slice(-5),
      },
      subscribed: !!users.find((subUser) => subUser.id == user.id),
      events: [],
    };
  }

  /**
   * Subscribe to Channel
   */
  @Post(':id/subscribe')
  @HttpCode(200)
  public async subscribe(
    @Param('id') id: string,
    @UserFromReq() user: User,
  ): Promise<void> {
    await this.channelService.subscribeToChannel(parseInt(id), user);
  }

  @Put()
  public async put(
    @Body() data: ChannelCreateRequest,
  ): Promise<ChannelResponse> {
    return this.channelService.create(data);
  }
}
