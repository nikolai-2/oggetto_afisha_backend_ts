import { Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guard/jwt-auth.guard';
import { ChannelListResponse } from './dto/channel-item-response.dto';
import { ChannelInfoResponse } from './dto/channel-info-response.dto';

@Controller('channel')
@ApiTags('CHANNEL')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class ChannelController {
  /**
   * Return channel list for authed player
   */
  @Get('list')
  public async list(): Promise<ChannelListResponse[]> {
    throw new Error('Not implemented');
  }

  /**
   * Return full channel info
   */
  @Get(':id')
  public async get(@Param('id') id: number): Promise<ChannelInfoResponse> {
    throw new Error('Not implemented');
  }

  /**
   * Subscribe to channel
   */
  @Post(':id/subscribe')
  public async subscribe(@Param('id') id: number): Promise<void> {
    throw new Error('Not implemented');
  }
}
