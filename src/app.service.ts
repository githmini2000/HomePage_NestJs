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

  // Section 1: Get Paginated Products
  getPaginatedProducts(page: number, size: number): Product[] {
    const start = page * size;
    const end = Math.min(start + size, this.products.length);

    if (start >= this.products.length) {
      return [];
    }
    return this.products.slice(start, end).map((product) => ({
      ...product,
      image: `http://localhost:3001/assets/images/${product.image}`,
    }));
  }

  // Section 2: Get Best-Selling Products (Currently identical to paginated products)
  getBestSellingProducts(page: number, size: number): Product[] {
    // For now, we just return the same products as paginated.
    // This can be adjusted if there's a way to mark "best-selling" products.
    return this.getPaginatedProducts(page, size);
  }

  // Section 3: Get Limited Number of Products
  getLimitedProducts(limit: number): Product[] {
    return this.products.slice(0, limit).map((product) => ({
      ...product,
       image: `http://localhost:3001/assets/images/${product.image}`,
    }));
  }
}
