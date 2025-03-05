import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BestSelling, FeaturedItems, TodaysDeals } from './app.entity';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

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
      synchronize: false,
    }),
    TypeOrmModule.forFeature([BestSelling, FeaturedItems, TodaysDeals]),

    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'assets'),
      serveRoot: '/images',
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
