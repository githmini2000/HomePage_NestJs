import { Controller, Get, Query } from '@nestjs/common';
import { AppService, Product } from './app.service';

@Controller('products')
export class AppController {
  constructor(private readonly appService: AppService) {}

  // Section 1:
  @Get('get-products')
  getPaginatedProducts(
    @Query('page') page: string,
    @Query('size') size: string,
  ): Product[] {
    const pageNumber = parseInt(page, 10) || 0;
    const pageSize = parseInt(size, 10) || 4;
    return this.appService.getPaginatedProducts(pageNumber, pageSize);
  }

  // Section 2:
  @Get('get-best-selling-products')
  getBestSellingProducts(
    @Query('page') page: string,
    @Query('size') size: string,
  ): Product[] {
    const pageNumber = parseInt(page, 10) || 0;
    const pageSize = parseInt(size, 10) || 4;
    return this.appService.getBestSellingProducts(pageNumber, pageSize);
  }

  // Section 3:
  @Get('get-section3-products')
  getSection3Products(@Query('limit') limit: string): Product[] {
    const limitNumber = parseInt(limit, 10) || 4;
    return this.appService.getLimitedProducts(limitNumber);
  }
}
