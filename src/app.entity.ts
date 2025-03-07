import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Category } from './category/category.entity';

// BestSelling Entity
@Entity('bestselling')
export class BestSelling {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  image: string;

  @Column()
  title: string;

  @Column()
  price: number;

  @Column()
  description: string;

  @Column()
  rating: number;
}

// FeaturedItems Entity
@Entity('featureditem')
export class FeaturedItems {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  image: string;

  @Column()
  title: string;

  @Column()
  price: number;

  @Column()
  description: string;

  @Column()
  rating: number;

  @ManyToOne(() => Category)
  @JoinColumn({ name: 'category_id' })
  category: Category;
}

// TodaysDeals Entity
@Entity('todaysdeals')
export class TodaysDeals {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  image: string;

  @Column()
  title: string;

  @Column()
  price: number;

  @Column()
  description: string;

  @Column()
  rating: number;
}
