import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BestSelling } from './app.entity'; // Import your entity
import { FeaturedItems } from './app.entity'; // Import your entity
import { TodaysDeals } from './app.entity'; // Import your entity

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost', 
      port: 3306, 
      username: 'root', 
      password: 'Password12', 
      database: 'homepage', 
      entities: [BestSelling, FeaturedItems, TodaysDeals], 
      synchronize: true, 
    }),
    TypeOrmModule.forFeature([BestSelling, FeaturedItems, TodaysDeals]),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
