import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Category } from './category.entity';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,
  ) {}

  async createCategory(name: string): Promise<Category> {
    const category = this.categoryRepository.create({ name });
    return this.categoryRepository.save(category);
  }

  async getCategories(): Promise<Category[]> {
    return this.categoryRepository.find();
  }
  // Delete method
  async deleteCategory(id: string): Promise<string> {
    const categoryId = Number(id);  

    if (isNaN(categoryId)) {
      throw new NotFoundException(`Category with id ${id} is invalid`);
    }

    const category = await this.categoryRepository.findOne({ where: { id: categoryId } });

    if (!category) {
      throw new NotFoundException(`Category with id ${categoryId} not found`);
    }

    await this.categoryRepository.remove(category);
    return `Category with id ${categoryId} deleted successfully`;
  }
  
   // Edit method
  async editCategory(id: string, name: string): Promise<Category> {
    const categoryId = Number(id);

    if (isNaN(categoryId)) {
      throw new NotFoundException(`Category with id ${id} is invalid`);
    }

    const category = await this.categoryRepository.findOne({ where: { id: categoryId } });

    if (!category) {
      throw new NotFoundException(`Category with id ${categoryId} not found`);
    }

  
    category.name = name;

    return this.categoryRepository.save(category);
  }
}
