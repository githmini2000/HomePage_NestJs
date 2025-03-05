import { Controller, Get, Query } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('items')
  async getItems(
    @Query('section') section: string,
    @Query('page') page: string,
    @Query('size') size: string,
  ) {
    const pageNumber = page ? parseInt(page, 10) : 1; // Default page 1
    const pageSize = size ? parseInt(size, 10) : 4; // Default size 4

    // Validate section parameter
    if (
      !section ||
      !['bestSelling', 'featuredItems', 'todaysDeals'].includes(section)
    ) {
      return {
        message:
          'Invalid section. Please use: bestSelling, featuredItems, or todaysDeals.',
      };
    }

    // Fetch paginated data
    const paginatedData = await this.appService.getPaginatedItems(
      section,
      pageNumber,
      pageSize,
    );

    return paginatedData.items;
  }
}
