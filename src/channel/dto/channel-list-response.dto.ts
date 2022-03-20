import { ChannelItemResponse } from './channel-item-response.dto';

export class ChannelListResponse {
  subscribed: ChannelItemResponse[];
  other: ChannelItemResponse[];
}
