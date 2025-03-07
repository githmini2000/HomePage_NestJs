import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { FeaturedItems } from '../app.entity';

@Entity('category')
export class Category {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  name: string;

  @OneToMany(() => FeaturedItems, (featuredItem) => featuredItem.category)
  featuredItems: FeaturedItems[];
}
