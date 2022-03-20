import { Controller, Get, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { SearchRequest } from './dto/search-request.dto';
import { EventCard } from '../event/dto/event-card.dto';

@ApiTags('SEARCH')
@Controller('search')
export class SearchController {
  @Get()
  public async get(@Query() query: SearchRequest): Promise<EventCard[]> {
    throw new Error('Not implemented');
  }
}
