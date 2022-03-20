import { Injectable } from '@nestjs/common';
import { calendar_v3, google } from 'googleapis';
import { Event } from '../event/type/event.type';
import { auth, OAuth2Client } from 'google-auth-library';
import { User } from '../user/type/user.type';
import Calendar = calendar_v3.Calendar;
import moment from '../util/moment';

@Injectable()
export class CalendarService {
  private calendar: Calendar;

  constructor() {
    this.calendar = google.calendar('v3');
  }

  public async createEvent(event: Event, user: User): Promise<string> {
    const auth = this.getAuth(user);
    console.log({
      summary: event.name,
      start: {
        dateTime: moment(event.startDate).toISOString(),
        timeZone: 'Europe/Moscow',
      },
      end: {
        dateTime: moment(event.endDate).toISOString(),
        timeZone: 'Europe/Moscow',
      },
      description: event.text,
    });
    const data = await this.calendar.events.insert({
      auth: auth,
      calendarId: 'primary',
      sendNotifications: true,
      requestBody: {
        summary: event.name,
        start: {
          dateTime: moment(event.startDate).toISOString(),
          timeZone: 'Europe/Moscow',
        },
        end: {
          dateTime: moment(event.endDate).toISOString(),
          timeZone: 'Europe/Moscow',
        },
        description: event.text,
      },
    });
    return data.data.id;
  }

  public async deleteEvent(calendarEventId: string, user: User): Promise<void> {
    const auth = this.getAuth(user);
    await this.calendar.events.delete({
      auth: auth,
      eventId: calendarEventId,
      calendarId: 'primary',
    });
  }

  public getAuth(user: User): OAuth2Client {
    const auth = new OAuth2Client(
      process.env.GOOGLE_CLIENT_ID,
      process.env.GOOGLE_CLIENT_SECRET,
      `${process.env.HOST}/auth/redirect`,
    );
    auth.setCredentials({
      access_token: user.accessToken,
    });
    return auth;
  }
}
