import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

// BestSelling Entity
@Entity('bestsellings')
export class BestSelling {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  price: number;
}

// FeaturedItems Entity
@Entity('featureditems')
export class FeaturedItems {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  price: number;
}

// TodaysDeals Entity
@Entity('todaysdeals')
export class TodaysDeals {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  price: number;
}
