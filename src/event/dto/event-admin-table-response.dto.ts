import { EventCard } from './event-card.dto';

export class EventAdminTableResponse extends EventCard {
  /**
   * Users count
   */
  usersCount: number;

  /**
   * Any place (Not processed)
   *
   * @example "Твоя мать"
   */
  place: string;
}
