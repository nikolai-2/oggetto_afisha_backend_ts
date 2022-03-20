import {
  Controller,
  Get,
  Redirect,
  Render,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags } from '@nestjs/swagger';
import { JwtService } from '@nestjs/jwt';
import { UserFromReq } from './decorator/user.decorator';
import { User } from '../user/type/user.type';
import { AuthService } from './auth.service';
import { OAuth2Client } from 'google-auth-library';
import { Request } from 'express';

@ApiTags('AUTH')
@Controller('auth')
export class AuthController {
  private oauthClient: OAuth2Client;

  constructor(
    private jwtService: JwtService,
    private readonly authService: AuthService,
  ) {
    this.oauthClient = new OAuth2Client(
      process.env.GOOGLE_CLIENT_ID,
      process.env.GOOGLE_CLIENT_SECRET,
      `${process.env.HOST}/auth/redirect`,
    );
  }

  /**
   * Returns access token in js script
   */
  @Get()
  @Redirect('', 302)
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  public auth(): any {
    const authUrl = this.oauthClient.generateAuthUrl({
      access_type: 'offline',
      scope: ['profile', 'https://www.googleapis.com/auth/calendar'],
    });
    return { url: authUrl };
  }

  @Get('redirect')
  @UseGuards(AuthGuard('google'))
  public async redirect(@UserFromReq() user: User) {
    user = await this.authService.updateUser(user);
    return {
      user: user,
      accessToken: this.authService.getToken(user),
    };
  }

  /**
   * Returns access token in js script
   */
  @Get('admin')
  //@UseGuards(AuthGuard('google-admin'))
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  public authAdmin(): void {}

  @Get('redirect-admin')
  @UseGuards(AuthGuard('google-admin'))
  @Render('oauth-admin')
  public async redirectAdmin(@UserFromReq() user: User) {
    user = await this.authService.updateUser(user);
    return {
      token: this.authService.getToken(user),
    };
  }

  @Get('debug')
  public async debug(): Promise<any> {
    return {
      token: this.jwtService.sign({ id: 1 }),
    };
  }
}
