import { Module } from '@nestjs/common';
import { EventAdminController } from './event-admin.controller';
import { EventController } from './event.controller';
import { EventService } from './event.service';
import { CalendarModule } from '../calendar/calendar.module';

@Module({
  imports: [CalendarModule],
  controllers: [EventController, EventAdminController],
  providers: [EventService],
})
export class EventModule {}
