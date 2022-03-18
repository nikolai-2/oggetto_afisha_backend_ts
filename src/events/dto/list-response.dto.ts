import { EventCard } from './event-card.dto';

export class ListResponse {
  /**
   * Array of event cards today
   */
  today: EventCard[];

  /**
   * Most popular cards
   */
  mostPopular: EventCard[];

  /**
   * Player interested cards
   */
  interested: EventCard[];
}
