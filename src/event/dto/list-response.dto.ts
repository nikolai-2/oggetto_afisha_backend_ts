import { EventCard } from './event-card.dto';

export class ListResponse {
  /**
   * Array of event cards today
   * Sort by date
   */
  today: EventCard[];

  /**
   * Most popular cards at one week (relatively of today or atDate)
   * Sort by count of assigned users
   */
  mostPopular: EventCard[];

  /**
   * Player interested cards at one month (relatively of today or atDate)
   * Sort by date
   */
  interested: EventCard[];
}
