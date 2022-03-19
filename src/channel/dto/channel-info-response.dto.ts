import { UserStack } from '../../user/dto/user-stack.dto';
import { EventCard } from '../../event/dto/event-card.dto';
import { ChannelResponse } from './channel-response.dto';

export class ChannelInfoResponse extends ChannelResponse {
  /**
   * GetUser stack info
   */
  users: UserStack;

  /**
   * Is the user subscribed to the Channel
   *
   * @example false
   */
  subscribed: boolean;

  /**
   * Array of event cards for Channel
   */
  events: EventCard[];
}
