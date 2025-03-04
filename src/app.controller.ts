import { Controller, Get, Query } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('items')
  async getItems(@Query('page') page: string) {
    const pageNumber = page ? parseInt(page, 10) : 1; // Default to page 1 if no query parameter is provided
    const paginatedData = await this.appService.getPaginatedItems(pageNumber);
    const todaysDeals = await this.appService.getTodaysDeals();

    return {
      ...paginatedData,
      todaysDeals, // Include TodaysDeals in the response
    };
  }
}
