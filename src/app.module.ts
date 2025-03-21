import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BestSelling, FeaturedItems, TodaysDeals } from './app.entity';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { Category } from './category/category.entity';
import { CategoryModule } from './category/category.module';
import { Customer } from './customer/customer.entity';  
import { CustomerModule } from './customer/customer.module'; 

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'Password12',
      database: 'homepage',
      entities: [BestSelling, FeaturedItems, TodaysDeals, Category,Customer],
      synchronize: false,
    }),
    TypeOrmModule.forFeature([
      BestSelling,
      FeaturedItems,
      TodaysDeals,
      Category,
      Customer,
    ]),

    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'assets'),
      serveRoot: '/images',
    }),
    CategoryModule,
    CustomerModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
