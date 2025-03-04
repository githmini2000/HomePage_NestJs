import { Controller, Get, Query } from '@nestjs/common';
import { AppService, Product } from './app.service';

@Controller('products')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('get-products')
  getProducts(
    @Query('section') section: string,
    @Query('page') page: string,
    @Query('size') size: string
  ): Product[] {
    const pageNumber = parseInt(page, 10) || 0;
    const pageSize = parseInt(size, 10) || 4;

    return this.appService.getProductsBySection(section, pageNumber, pageSize);
  }
}
