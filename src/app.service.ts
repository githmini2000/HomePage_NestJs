import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BestSelling, FeaturedItems, TodaysDeals } from './app.entity';
import { Category } from './category/category.entity';

@Injectable()
export class AppService {
  constructor(
    @InjectRepository(BestSelling)
    private bestSellingRepository: Repository<BestSelling>,

    @InjectRepository(FeaturedItems)
    private featuredItemsRepository: Repository<FeaturedItems>,

    @InjectRepository(TodaysDeals)
    private todaysDealsRepository: Repository<TodaysDeals>,

    @InjectRepository(Category)
    private readonly categoryRepo: Repository<Category>,
  ) {}

  // Fetch paginated items
  async getPaginatedItems(
    section: string,
    page: number = 1,
    pageSize: number = 4,
  ) {
    let repository: Repository<any>;

    switch (section) {
      case 'bestSelling':
        repository = this.bestSellingRepository;
        break;
      case 'featuredItems':
        repository = this.featuredItemsRepository;
        break;
      case 'todaysDeals':
        repository = this.todaysDealsRepository;
        break;
      default:
        throw new Error('Invalid section');
    }

    // Get paginated items
    const items = await repository.find({
      skip: (page - 1) * pageSize,
      take: pageSize,
    });

    const updatedItems = items.map((item) => ({
      ...item,
      image:
        item.image && item.image.startsWith('http')
          ? item.image
          : `http://localhost:3001/images/${item.image || 'default.jpg'}`,
    }));

    return {
      section,
      items: updatedItems,
    };
  }

  // Add a new item
  async addItem(
    section: string,
    newItem: BestSelling | FeaturedItems | TodaysDeals,
    category_id?: number,
  ) {
    let repository: Repository<any>;

    switch (section) {
      case 'bestSelling':
        repository = this.bestSellingRepository;
        break;
      case 'featuredItems':
        repository = this.featuredItemsRepository;
        break;
      case 'todaysDeals':
        repository = this.todaysDealsRepository;
        break;
      default:
        throw new Error('Invalid section');
    }

    // Fetch the category by id if provided
    if (category_id) {
      const category = await this.getCategoryById(category_id);
      (newItem as any).category = category;
    }

    const item = repository.create(newItem);
    return await repository.save(item);
  }

  // Helper method to fetch Category by ID
  private async getCategoryById(categoryId: number) {
    const category = await this.categoryRepo.findOne({
      where: { id: categoryId },
    });

    if (!category) {
      throw new Error('Category not found');
    }

    return category;
  }

  // Update an existing item
  async updateItem(
    section: string,
    id: string,
    updatedItem: BestSelling | FeaturedItems | TodaysDeals,
    category_id?: number,
  ) {
    let repository: Repository<any>;

    switch (section) {
      case 'bestSelling':
        repository = this.bestSellingRepository;
        break;
      case 'featuredItems':
        repository = this.featuredItemsRepository;
        break;
      case 'todaysDeals':
        repository = this.todaysDealsRepository;
        break;
      default:
        throw new Error('Invalid section');
    }

    const item = await repository.findOne({
      where: { id: Number(id) },
      relations: ['category'],
    });

    if (!item) {
      throw new Error('Item not found');
    }

    // Assign category if category_id is provided
    if (category_id) {
      const category = await this.getCategoryById(category_id);
      (updatedItem as any).category = category;
    }

    // Update item details
    Object.assign(item, updatedItem);
    return await repository.save(item);
  }

  // Delete an item
  async deleteItem(section: string, id: string) {
    let repository: Repository<any>;

    switch (section) {
      case 'bestSelling':
        repository = this.bestSellingRepository;
        break;
      case 'featuredItems':
        repository = this.featuredItemsRepository;
        break;
      case 'todaysDeals':
        repository = this.todaysDealsRepository;
        break;
      default:
        throw new Error('Invalid section');
    }

    const item = await repository.findOne({ where: { id } });
    if (!item) {
      throw new Error('Item not found');
    }

    await repository.remove(item);
  }
}
