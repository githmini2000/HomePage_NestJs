import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

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
