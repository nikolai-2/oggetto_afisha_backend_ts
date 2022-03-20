import { Channel } from 'src/channel/type/channel.type';
import Prisma from '../../util/prisma';
import { User } from '../../user/type/user.type';

export type Event = Prisma.Event;
export type EventWithChannel = Event & {
  Channel: Channel;
};

export type EventWithAssignations = Event & {
  EventAssignations: Prisma.EventAssignations[];
};

export type EventWithUsers = Event & {
  users: User[];
};

export type EventWithTags = Event & {
  tags: Prisma.Tags[];
};
