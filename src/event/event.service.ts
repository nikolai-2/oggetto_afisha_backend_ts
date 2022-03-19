import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Nullable } from '../util/nullable';
import { Event, EventWithChannel, EventWithUsers } from './type/event.type';
import { DateTime } from '../util/datetime';
import lodash from '../util/lodash';
import { User } from '../user/type/user.type';
import moment from '../util/moment';

@Injectable()
export class EventService {
  constructor(private readonly prisma: PrismaService) {}

  public async getById(id: number): Promise<Nullable<Event>> {
    return this.prisma.event.findUnique({
      where: { id: id },
    });
  }

  public async getList(): Promise<Event[]> {
    return this.prisma.event.findMany();
  }

  public async getToday(atDate: DateTime): Promise<EventWithChannel[]> {
    const currentDate = atDate;
    return this.prisma.event.findMany({
      orderBy: {
        startDate: 'asc',
      },
      where: {
        startDate: {
          gte: moment(currentDate).startOf('d').toDate(),
        },
        endDate: {
          lt: moment(currentDate).endOf('d').toDate(),
        },
      },
      include: {
        Channel: true,
      },
    });
  }

  public async mostPopular(atDate: DateTime): Promise<EventWithChannel[]> {
    const currentDate = atDate;
    const data = await this.prisma.event.findMany({
      orderBy: {
        startDate: 'asc',
      },
      where: {
        startDate: {
          gte: moment(currentDate).startOf('d').toDate(),
        },
        endDate: {
          lt: moment(currentDate).endOf('d').add(1, 'w').toDate(),
        },
      },
      include: {
        EventAssignations: true,
        Channel: true,
      },
    });

    const sorted = lodash.sortBy(
      data,
      (record) => record.EventAssignations.length,
    );
    return sorted.map((record) => {
      const { EventAssignations, ...data } = record;
      return data;
    });
  }

  public async interested(
    user: User,
    atDate: DateTime,
  ): Promise<EventWithChannel[]> {
    const currentDate = atDate;
    return await this.prisma.event.findMany({
      orderBy: {
        startDate: 'asc',
      },
      where: {
        startDate: {
          gte: moment(currentDate).startOf('d').toDate(),
        },
        endDate: {
          lt: moment(currentDate).endOf('d').add(1, 'm').toDate(),
        },
        Channel: {
          ChannelSubscription: {
            some: {
              userId: user.id,
            },
          },
        },
      },
      include: {
        Channel: true,
      },
    });
  }

  public async getByIdWithUsers(
    id: number,
  ): Promise<EventWithUsers & EventWithChannel> {
    const record = await this.prisma.event.findUnique({
      where: { id: id },
      include: {
        EventAssignations: {
          include: {
            User: true,
          },
          orderBy: {
            id: 'asc',
          },
        },
        Channel: true,
      },
    });

    const { EventAssignations, ...data } = record;
    const users = EventAssignations.map((assignations) => assignations.User);
    return {
      ...data,
      users: users,
    };
  }

  public async assignToEvent(id: number, user: User): Promise<void> {
    await this.prisma.eventAssignations.create({
      data: {
        eventId: id,
        userId: user.id,
      },
    });
  }
}
