export class EventCard {
  /**
   * Event id
   * Used to get more detailed information about the event
   *
   * @example 1
   */
  id: number;

  /**
   * Image path
   * Path to the event poster
   *
   * @example "http://google.com/image"
   */
  image: string;

  /**
   * Channel (Genre)
   */
  channel: string;

  /**
   * Event title
   *
   * @example "Пишев нахуй"
   */
  name: string;

  /**
   * Event start date
   */
  startDate: Date;

  /**
   * Event end date
   */
  endDate: Date;

  /**
   * Event period text
   *
   * @example "еженедельно"
   */
  period?: string;
}
