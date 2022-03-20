import { Controller, Get } from '@nestjs/common';
import { CalendarService } from './calendar.service';
import moment from '../util/moment';

@Controller('calendar')
export class CalendarController {
  constructor(private readonly calendarService: CalendarService) {}
  @Get('debug')
  public async debug(): Promise<void> {
    await this.calendarService.createEvent({
      id: 1,
      name: 'dfsdfg',
      startDate: moment().startOf('d').toDate(),
      endDate: moment().endOf('d').toDate(),
      text: 'sdfsdf',
      socialLink: 'sdfsdf',
      channelId: 1,
      period: 0,
      place: 'df',
      image: 'asdf',
      ownerId: 'sdfs',
    });
  }
}
