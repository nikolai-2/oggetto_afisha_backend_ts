import { UserWithoutCredentials } from '../../user/type/user.type';

export class EventAdminResponse {
  id: number;
  name: string;
  image: string;
  startDate: Date;
  endDate: Date;
  period?: number;
  place: string;
  socialLink: string;
  users: UserWithoutCredentials[];
  text: string;
  channel: string;
  owner?: UserWithoutCredentials;
}
