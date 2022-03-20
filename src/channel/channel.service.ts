import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import {
  Channel,
  ChannelCreate,
  ChannelWithSubscription,
  ChannelWithUsers,
} from './type/channel.type';
import { Nullable } from '../util/nullable';
import { User } from '../user/type/user.type';

@Injectable()
export class ChannelService {
  constructor(private readonly prisma: PrismaService) {}

  public async getById(id: number): Promise<Nullable<Channel>> {
    return this.prisma.channel.findUnique({
      where: { id: id },
    });
  }

  public async getList(): Promise<(Channel & ChannelWithSubscription)[]> {
    return this.prisma.channel.findMany({
      include: {
        ChannelSubscription: true,
      },
    });
  }

  public async getByIdWithUsers(id: number): Promise<ChannelWithUsers> {
    const record = await this.prisma.channel.findUnique({
      where: { id: id },
      include: {
        ChannelSubscription: {
          include: {
            User: true,
          },
          orderBy: {
            id: 'asc',
          },
        },
      },
    });

    const { ChannelSubscription, ...data } = record;
    const users = ChannelSubscription.map((subscription) => subscription.User);
    return {
      ...data,
      users: users,
    };
  }

  public async subscribeToChannel(id: number, user: User): Promise<void> {
    await this.prisma.channelSubscription.create({
      data: {
        channelId: id,
        userId: user.id,
      },
    });
  }

  public async subscribeCancelToChannel(id: number, user: User): Promise<void> {
    await this.prisma.channelSubscription.deleteMany({
      where: {
        channelId: id,
        userId: user.id,
      },
    });
  }

  public async create(data: ChannelCreate): Promise<Channel> {
    const { name, icon, image, text } = data;
    return this.prisma.channel.create({
      data: {
        name: name,
        icon: icon,
        image: image,
        text: text,
      },
    });
  }
}
