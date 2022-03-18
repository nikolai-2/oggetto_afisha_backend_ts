import { UserStack } from '../../events/dto/user-stack.dto';
import { EventCard } from '../../events/dto/event-card.dto';

export class ChannelInfoResponse {
  /**
   * Channel id
   *
   * @example 1
   */
  id: number;

  /**
   * Channel screen name
   *
   * @example "Исскуство"
   */
  name: string;

  /**
   * PNG cover image url
   *
   * @example "https://google.com/image"
   */
  image: string;

  /**
   * Rich Text content
   *
   * @example "<p>Hi everyone</p><b>Im gay!</b>"
   */
  text: string;

  /**
   * GetUser stack info
   */
  users: UserStack;

  /**
   * Is the user subscribed to the channel
   *
   * @example false
   */
  subscribed: boolean;

  /**
   * Array of event cards for channel
   */
  events: EventCard[];
}
