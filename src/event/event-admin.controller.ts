import { Controller, Get } from '@nestjs/common';
import { EventAdminTableResponse } from './dto/event-admin-table-response.dto';
import { PeriodProcessor } from '../util/period.processor';
import { EventService } from './event.service';
import { EventAdminResponse } from './dto/event-admin-response.dto';

@Controller('api-admin/event')
export class EventAdminController {
  constructor(private readonly eventService: EventService) {}

  @Get('all')
  public async all(): Promise<EventAdminTableResponse[]> {
    const data = await this.eventService.getAll();
    return data.map((record) => ({
      id: record.id,
      name: record.name,
      image: record.image,
      startDate: record.startDate,
      endDate: record.endDate,
      place: record.place,
      period: PeriodProcessor.get(record.period),
      channel: record.Channel.name,
      usersCount: record.EventAssignations.length,
    }));
  }

  /*@Get(':id')
  public async get(): Promise<EventAdminResponse[]> {
    const data = await this.eventService.getAll();
    return data.map((record) => ({
      id: record.id,
      name: record.name,
      image: record.image,
      startDate: record.startDate,
      endDate: record.endDate,
      place: record.place,
      period: PeriodProcessor.get(record.period),
      channel: record.Channel.name,
      usersCount: record.EventAssignations.length,
    }));
  }*/
}
