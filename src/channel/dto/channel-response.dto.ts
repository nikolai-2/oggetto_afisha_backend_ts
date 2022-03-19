export class ChannelResponse {
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
}
