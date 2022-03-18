export class ChannelListResponse {
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
   * SVG or PNG icon url (Not yet decided)
   *
   * @example "https://google.com/image"
   */
  icon: string;
}
