import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { OauthStrategy } from './auth/strategy/oauth.strategy';
import { EventsModule } from './events/events.module';
import { ChannelModule } from './channel/channel.module';
import { PrismaModule } from './prisma/prisma.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [ConfigModule.forRoot(), AuthModule, EventsModule, ChannelModule, PrismaModule, UserModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
