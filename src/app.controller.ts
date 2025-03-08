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

  // GET method
  @Get('items')
  async getItems(
    @Query('section') section: string,
    @Query('page') page: string,
    @Query('size') size: string,
    @Query('category_id') category_id?: string,
  ) {
    const pageNumber = page ? parseInt(page, 10) : 1;
    const pageSize = size ? parseInt(size, 10) : 4;
    const categoryId = category_id ? parseInt(category_id, 10) : undefined;

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
      categoryId,
    );

    return paginatedData.items;
  }

  // POST method
  @Post('items/:section')
  async addItem(
    @Param('section') section: string,
    @Body() newItem: BestSelling | FeaturedItems | TodaysDeals,
  ) {
    const addedItem = await this.appService.addItem(section, newItem);
    return addedItem;
  }

  // PUT method
  @Put('items/:section/:id')
  async updateItem(
    @Param('section') section: string,
    @Param('id') id: string,
    @Body() updatedItem: Partial<BestSelling | FeaturedItems | TodaysDeals>,
  ) {
    const updated = await this.appService.updateItem(section, id, updatedItem);
    return updated;
  }

  // DELETE method
  @Delete('items/:section/:id')
  async deleteItem(@Param('section') section: string, @Param('id') id: string) {
    await this.appService.deleteItem(section, id);
    return { message: 'Item deleted successfully' };
  }
}
