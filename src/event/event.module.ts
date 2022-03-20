import { Module } from '@nestjs/common';
import { EventAdminController } from './event-admin.controller';
import { EventController } from './event.controller';
import { EventService } from './event.service';

@Module({
  controllers: [EventController, EventAdminController],
  providers: [EventService],
})
export class EventModule {}
