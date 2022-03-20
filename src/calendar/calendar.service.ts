import { Injectable } from '@nestjs/common';
import { google } from 'googleapis';
import { Event } from '../event/type/event.type';

@Injectable()
export class CalendarService {
  public async createEvent(event: Event): Promise<void> {
    const calendar = google.calendar('v3');
    calendar.events.insert({
      auth: new google.auth.JWT(null, null),
      calendarId: 'primary',
      requestBody: {
        summary: event.name,
        start: {
          dateTime: event.startDate.toISOString(),
          timeZone: 'Europe/Moscow',
        },
        end: {
          dateTime: event.endDate.toISOString(),
          timeZone: 'Europe/Moscow',
        },
      },
    });
  }
}
