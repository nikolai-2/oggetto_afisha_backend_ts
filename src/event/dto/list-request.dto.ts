import { IsDateString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ListRequest {
  /**
   * UTC Date format
   */
  @ApiProperty({ type: Date })
  @IsDateString()
  atDate: string;
}
