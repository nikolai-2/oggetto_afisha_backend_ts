import { Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { ListResponse } from './dto/list-response.dto';
import { EventResponse } from './dto/event-response.dto';
import { JwtAuthGuard } from '../auth/guard/jwt-auth.guard';

@ApiTags('EVENT')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
@Controller('event')
export class EventsController {
  /**
   * Return all data for home screen
   */
  @Get('list')
  public async list(): Promise<ListResponse> {
    throw new Error('Not implemented');
  }

  /**
   * Return full event data
   */
  @Get(':id')
  public async get(@Param('id') id: number): Promise<EventResponse> {
    throw new Error('Not implemented');
  }

  /**
   * Used for assign user to event
   */
  @Post(':id/assign')
  public async assign(@Param('id') id: number): Promise<void> {}
}
