import { Channel } from 'src/channel/type/channel.type';
import Prisma from '../../util/prisma';
import { User } from '../../user/type/user.type';

export type Event = Prisma.Event;
export type EventWithChannel = Event & {
  Channel: Channel;
};

export type EventWithUsers = Event & {
  users: User[];
};
