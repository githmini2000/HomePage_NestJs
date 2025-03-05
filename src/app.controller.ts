import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  Query,
} from '@nestjs/common';
import { AppService } from './app.service';
import { BestSelling, FeaturedItems, TodaysDeals } from './app.entity';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}
  // GET method to fetch items
  @Get('items')
  async getItems(
    @Query('section') section: string,
    @Query('page') page: string,
    @Query('size') size: string,
  ) {
    const pageNumber = page ? parseInt(page, 10) : 1; // Default page 1
    const pageSize = size ? parseInt(size, 10) : 4; // Default size 4

    if (
      !section ||
      !['bestSelling', 'featuredItems', 'todaysDeals'].includes(section)
    ) {
      return {
        message:
          'Invalid section. Please use: bestSelling, featuredItems, or todaysDeals.',
      };
    }

    const paginatedData = await this.appService.getPaginatedItems(
      section,
      pageNumber,
      pageSize,
    );

    return paginatedData.items;
  }

  // POST method to add new item
  @Post('items/:section')
  async addItem(
    @Param('section') section: string,
    @Body() newItem: BestSelling | FeaturedItems | TodaysDeals,
  ) {
    const addedItem = await this.appService.addItem(section, newItem);
    return addedItem;
  }

  // PUT method to update an existing item
  @Put('items/:section/:id')
  async updateItem(
    @Param('section') section: string,
    @Param('id') id: string,
    @Body() updatedItem: BestSelling | FeaturedItems | TodaysDeals,
  ) {
    const updated = await this.appService.updateItem(section, id, updatedItem);
    return updated;
  }

  // DELETE method to remove an item
  @Delete('items/:section/:id')
  async deleteItem(@Param('section') section: string, @Param('id') id: string) {
    await this.appService.deleteItem(section, id);
    return { message: 'Item deleted successfully' };
  }
}
