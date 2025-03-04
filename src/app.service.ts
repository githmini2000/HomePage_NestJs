import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';

export interface Product {
  id: number;
  image: string;
  title: string;
  price: number;
  description: string;
  rating: number;
}

@Injectable()
export class AppService {
  private products: {
    FeaturedItems: Product[];
    BestSellingProducts: Product[];
    TodaysDeals: Product[];
  };

  constructor() {
    const filePath = path.join(__dirname, '..', 'assets', 'product.json');
    console.log('Looking for file at:', filePath);
    const fileData = fs.readFileSync(filePath, 'utf-8');
    this.products = JSON.parse(fileData);
  }

  getProductsBySection(section: string, page: number, size: number): Product[] {
    let selectedProducts: Product[] = [];

    switch (section) {
      case 'featured':
        selectedProducts = this.products.FeaturedItems;
        break;
      case 'best-selling':
        selectedProducts = this.products.BestSellingProducts;
        break;
      case 'todays-deals':
        selectedProducts = this.products.TodaysDeals;
        break;
      default:
        return [];
    }

    const start = page * size;
    const end = Math.min(start + size, selectedProducts.length);

    return start >= selectedProducts.length ? [] : selectedProducts.slice(start, end);
  }
}
