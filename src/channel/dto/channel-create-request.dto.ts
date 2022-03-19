import { IsString, IsUrl } from 'class-validator';

export class ChannelCreateRequest {
  /**
   * Channel name
   *
   * @example "Искусство"
   */
  @IsString()
  name: string;

  /**
   * Channel icon
   *
   * @example "https://google.com"
   */
  @IsUrl()
  icon: string;

  /**
   * Channel image cover
   *
   * @example "https://goole.com"
   */

  @IsUrl()
  image: string;

  /**
   * Rich Text content
   */
  @IsString()
  text: string;
}
