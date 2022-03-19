import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { User } from './type/user.type';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  public async getById(id: string): Promise<User> {
    return this.prisma.user.findUnique({
      where: {
        id: id,
      },
    });
  }

  public async upsert(user: User): Promise<User> {
    const { id, firstName, lastName, accessToken, avatar } = user;
    return this.prisma.user.upsert({
      where: {
        id: id,
      },
      create: {
        id: id,
        firstName: firstName,
        lastName: lastName,
        accessToken: accessToken,
        avatar: avatar,
      },
      update: {
        firstName: firstName,
        lastName: lastName,
        accessToken: accessToken,
        avatar: avatar,
      },
    });
  }
}
