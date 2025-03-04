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
    private todaysDealsRepository: Repository<TodaysDeals>
  ) {}

  // Fetch paginated BestSelling and FeaturedItems
  async getPaginatedItems(page: number = 1) {
    const pageSize = 4; // Load 4 items at a time
    const bestSellingItems = await this.bestSellingRepository.find({
      skip: (page - 1) * pageSize,
      take: pageSize,
    });
    const featuredItems = await this.featuredItemsRepository.find({
      skip: (page - 1) * pageSize,
      take: pageSize,
    });

    return {
      bestSellingItems,
      featuredItems,
    };
  }

  // Fetch all TodaysDeals
  async getTodaysDeals() {
    const todaysDeals = await this.todaysDealsRepository.find();
    return todaysDeals;
  }
}
