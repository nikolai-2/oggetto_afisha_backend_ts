import Prisma from '../../util/prisma';

export type User = Prisma.User;

export type UserWithoutCredentials = Omit<User, 'accessToken'>;
