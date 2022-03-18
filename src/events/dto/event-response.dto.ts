import { UserStack } from './user-stack.dto';
import { EventCard } from './event-card.dto';

export class EventResponse extends EventCard {
  /**
   * GetUser stack info
   */
  users: UserStack;

  /**
   * Rich Text content
   *
   * @example "<p>Hi everyone</p><b>Im gay!</b>"
   */
  text: string;

  /**
   * Any place (Not processed)
   *
   * @example "Твоя мать"
   */
  place: string;

  /**
   * Social url
   *
   * @example "https://t.me/elona"
   */
  socialLink: string;

  /**
   * Is the user assigned to the event
   *
   * @example false
   */
  assigned: boolean;
}
