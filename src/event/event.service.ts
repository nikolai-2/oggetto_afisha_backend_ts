import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Nullable } from '../util/nullable';
import {
  Event,
  EventWithAssignations,
  EventWithChannel,
  EventWithTags,
  EventWithUsers,
} from './type/event.type';
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

  public async getAll(): Promise<(EventWithChannel & EventWithAssignations)[]> {
    const currentDate = moment(new Date());
    return this.prisma.event.findMany({
      orderBy: {
        startDate: 'asc',
      },
      where: {
        startDate: {
          gte: moment(currentDate).startOf('d').toDate(),
        },
      },
      include: {
        Channel: true,
        EventAssignations: true,
      },
    });
  }

  public async getList(): Promise<Event[]> {
    return this.prisma.event.findMany();
  }

  public async getToday(
    atDate: DateTime,
    user: User,
  ): Promise<EventWithChannel[]> {
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
        ownerId: {
          not: user.id,
        },
      },
      include: {
        Channel: true,
      },
    });
  }

  public async mostPopular(
    atDate: DateTime,
    user: User,
  ): Promise<EventWithChannel[]> {
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
        ownerId: {
          not: user.id,
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
        ownerId: {
          not: user.id,
        },
      },
      include: {
        Channel: true,
      },
    });
  }

  public async getByIdWithUsers(
    id: number,
  ): Promise<EventWithUsers & EventWithChannel & EventWithTags> {
    const record = await this.prisma.event.findUnique({
      where: {
        id: id,
      },
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
        EventTags: {
          include: {
            Tags: true,
          },
        },
      },
    });

    const { EventAssignations, EventTags, ...data } = record;
    const users = EventAssignations.map((assignations) => assignations.User);
    const tags = EventTags.map((eventTag) => eventTag.Tags);
    return {
      ...data,
      users: users,
      tags: tags,
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

  public async assignCancelToEvent(id: number, user: User): Promise<void> {
    await this.prisma.eventAssignations.deleteMany({
      where: {
        eventId: id,
        userId: user.id,
      },
    });
  }
}
