import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './strategy/jwt.strategy';
import { OauthStrategy } from './strategy/oauth.strategy';
import { AuthService } from './auth.service';
import { UserModule } from '../user/user.module';
import { OauthAdminStrategy } from './strategy/oauth-admin.strategy';

@Module({
  imports: [
    JwtModule.register({
      secret: 'nikolay_2_backdoor',
      signOptions: { expiresIn: '1d' },
    }),
    UserModule,
  ],
  controllers: [AuthController],
  providers: [JwtStrategy, OauthStrategy, AuthService, OauthAdminStrategy],
})
export class AuthModule {}
