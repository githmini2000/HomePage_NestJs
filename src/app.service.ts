import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BestSelling } from './app.entity';
import { FeaturedItems } from './app.entity';
import { TodaysDeals } from './app.entity';

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
      image: item.image.startsWith('http')
        ? item.image
        : `http://localhost:3001/images/${item.image}`,
    }));

    return {
      section,
      items: updatedItems,
    };
  }
}
