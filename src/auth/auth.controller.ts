import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags } from '@nestjs/swagger';
import { JwtService } from '@nestjs/jwt';
import { UserFromReq } from './decorator/user.decorator';
import { User } from '../user/types/user.type';
import { AuthService } from './auth.service';

@ApiTags('AUTH')
@Controller('auth')
export class AuthController {
  constructor(
    private jwtService: JwtService,
    private readonly authService: AuthService,
  ) {}

  /**
   * Returns access token in js script
   */
  @Get()
  @UseGuards(AuthGuard('google'))
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  public auth(): void {}

  @Get('redirect')
  @UseGuards(AuthGuard('google'))
  public async redirect(@UserFromReq() user: User) {
    user = await this.authService.updateUser(user);
    return {
      user: user,
      accessToken: this.authService.getToken(user),
    };
  }

  @Get('debug')
  public async debug(): Promise<any> {
    return {
      token: this.jwtService.sign({ id: 1 }),
    };
  }
}
