import { User } from 'src/user/type/user.type';
import Prisma from '../../util/prisma';

export type Channel = Prisma.Channel;

export type ChannelCreate = Omit<Channel, 'id'>;

export type ChannelWithSubscription = Channel & {
  ChannelSubscription: Prisma.ChannelSubscription[];
};

export type ChannelWithUsers = Channel & {
  users: User[];
};
