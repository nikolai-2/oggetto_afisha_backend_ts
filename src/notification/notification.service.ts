import { Injectable } from '@nestjs/common';
import { Event } from '../event/type/event.type';
import { HttpService } from '@nestjs/axios';
import { OnEvent } from '@nestjs/event-emitter';

@Injectable()
export class NotificationService {
  constructor(private readonly httpService: HttpService) {}

  @OnEvent('newEvent')
  public async newEvent(channelId: number, event: Event): Promise<void> {
    this.httpService.post('', {
      channel_id: channelId,
      event: {
        id: event.id,
        name: 'Новое событие по твоим интересам',
        description: event.name,
      },
    });
  }
}
