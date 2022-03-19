import { PassportStrategy } from '@nestjs/passport';
import { Strategy, VerifyCallback } from 'passport-google-oauth20';
import { User } from '../../user/type/user.type';

export class OauthStrategy extends PassportStrategy(Strategy, 'google') {
  constructor() {
    super({
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: `${process.env.HOST}/auth/redirect`,
      scope: ['profile'],
    });
  }

  public async validate(
    accessToken: string,
    refreshToken: string,
    profile: any,
    done: VerifyCallback,
  ): Promise<any> {
    const { id, name, photos } = profile;
    const user: User = {
      id: id,
      firstName: name.givenName,
      lastName: name.familyName,
      avatar: photos[0].value,
      accessToken: accessToken,
    };
    done(null, user);
  }
}
