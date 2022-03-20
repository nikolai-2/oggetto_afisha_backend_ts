import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { ListResponse } from './dto/list-response.dto';
import { EventResponse } from './dto/event-response.dto';
import { JwtAuthGuard } from '../auth/guard/jwt-auth.guard';
import { ListRequest } from './dto/list-request.dto';
import { EventService } from './event.service';
import * as moment from 'moment';
import { UserFromReq } from '../auth/decorator/user.decorator';
import { User } from 'src/user/type/user.type';
import { EventWithChannel } from './type/event.type';
import { EventCard } from './dto/event-card.dto';
import { PeriodProcessor } from '../util/period.processor';

@ApiTags('EVENT')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
@Controller('event')
export class EventController {
  constructor(private readonly eventService: EventService) {}

  /**
   * Return all data for home screen
   */
  @Post('list')
  public async list(
    @UserFromReq() user: User,
    @Body() listRequest: ListRequest,
  ): Promise<ListResponse> {
    const date = moment(listRequest.atDate);

    const [today, mostPopular, interested] = await Promise.all([
      this.eventService.getToday(date, user),
      this.eventService.mostPopular(date, user),
      this.eventService.interested(user, date),
    ]);

    return {
      today: today.map((record) => this.prettyCard(record)),
      mostPopular: mostPopular.map((record) => this.prettyCard(record)),
      interested: interested.map((record) => this.prettyCard(record)),
    };
  }

  /**
   * Return full event data
   */
  @Get(':id')
  public async get(
    @Param('id') id: string,
    @UserFromReq() user: User,
  ): Promise<EventResponse> {
    const { users, Channel, period, tags, ...data } =
      await this.eventService.getByIdWithUsers(parseInt(id));
    return {
      ...data,
      users: {
        count: users.length,
        avatars: users.map((user) => user.avatar).slice(-5),
      },
      assigned: !!users.find((assUser) => assUser.id == user.id),
      channel: Channel.name,
      period: PeriodProcessor.get(period || 0),
      tags: tags.map((tag) => tag.name),
    };
  }

  /**
   * Used for assign user to event
   */
  @Post(':id/assign')
  public async assign(
    @Param('id') id: string,
    @UserFromReq() user: User,
  ): Promise<void> {
    await this.eventService.assignToEvent(parseInt(id), user);
  }

  /**
   * Used for cancel assign user to event
   */
  @Post(':id/assign/cancel')
  public async assignCancel(
    @Param('id') id: string,
    @UserFromReq() user: User,
  ): Promise<void> {
    await this.eventService.assignCancelToEvent(parseInt(id), user);
  }

  private prettyCard(event: EventWithChannel): EventCard {
    const { id, image, Channel, name, startDate, endDate, period } = event;
    return {
      id: id,
      image: image,
      channel: Channel.name,
      name: name,
      startDate: startDate,
      endDate: endDate,
      period: PeriodProcessor.get(period || 0),
    };
  }
}
