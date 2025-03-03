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
  private products: Product[] = [];

  constructor() {
    const filePath = path.join(__dirname, '..', 'assets', 'product.json');
    console.log('Looking for file at:', filePath);
    const fileData = fs.readFileSync(filePath, 'utf-8');
    this.products = JSON.parse(fileData);
  }

  getPaginatedProducts(page: number, size: number): Product[] {
    const start = page * size;
    const end = Math.min(start + size, this.products.length);

    if (start >= this.products.length) {
      return [];
    }
    return this.products.slice(start, end);
  }

  getBestSellingProducts(page: number, size: number): Product[] {
    return this.getPaginatedProducts(page, size);
  }

  getLimitedProducts(limit: number): Product[] {
    return this.products.slice(0, limit);
  }
}
