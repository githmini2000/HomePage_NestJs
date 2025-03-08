import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BestSelling, FeaturedItems, TodaysDeals } from './app.entity';

@Injectable()
export class AppService {
  constructor(
    @InjectRepository(BestSelling)
    private bestSellingRepository: Repository<BestSelling>,

    @InjectRepository(FeaturedItems)
    private featuredItemsRepository: Repository<FeaturedItems>,

    @InjectRepository(TodaysDeals)
    private todaysDealsRepository: Repository<TodaysDeals>,
  ) {}
  async getPaginatedItems(
    section: string,
    page: number = 1,
    pageSize: number = 4,
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

    const where: any = {};

    if (category_id) {
      where.category = { id: category_id };
    }

    // Get paginated and filtered items
    const items = await repository.find({
      where,
      skip: (page - 1) * pageSize,
      take: pageSize,
      relations: ['category'],
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

    const item = repository.create(newItem);
    return await repository.save(item);
  }

  // Update an existing item
  async updateItem(
    section: string,
    id: string,
    updatedItem: Partial<BestSelling | FeaturedItems | TodaysDeals>,
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
    });

    if (!item) {
      throw new Error('Item not found');
    }

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
