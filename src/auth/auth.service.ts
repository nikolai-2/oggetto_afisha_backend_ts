import { Injectable } from '@nestjs/common';
import { User } from '../user/types/user.type';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  public async updateUser(user: User): Promise<User> {
    return this.userService.upsert(user);
  }

  public async getToken(user: User): Promise<string> {
    return this.jwtService.sign({ id: user.id, sub: user.firstName });
  }
}
