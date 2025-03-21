import { Controller,Put,  Post, Get,Delete, Param, Body } from '@nestjs/common';
import { CategoryService } from './category.service';

@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Post()
  async createCategory(@Body('name') name: string) {
    return this.categoryService.createCategory(name);
  }

  @Get()
  async getCategories() {
    return this.categoryService.getCategories();
  }

  @Delete(':id')
  async deleteCategory(@Param('id') id: string) {
    return this.categoryService.deleteCategory(id);
  }

  @Put(':id') 
  async editCategory(
    @Param('id') id: string, 
    @Body('name') name: string, 
  ) {
    return this.categoryService.editCategory(id, name);
  }
}
