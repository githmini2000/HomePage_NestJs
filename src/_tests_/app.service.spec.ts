import { Test, TestingModule } from '@nestjs/testing';
import { AppService } from '../app.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { FeaturedItems, TodaysDeals, BestSelling } from '../app.entity';
import { Repository, ObjectLiteral } from 'typeorm';

const mockRepository = () => ({
  find: jest.fn(),
  findOne: jest.fn(),
  create: jest.fn(),
  save: jest.fn(),
  remove: jest.fn(),
});

type MockRepository<T extends ObjectLiteral = any> = Partial<
  Record<keyof Repository<T>, jest.Mock>
>;

describe('AppService', () => {
  let service: AppService;
  let featuredItemsRepo: MockRepository<FeaturedItems>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AppService,
        {
          provide: getRepositoryToken(FeaturedItems),
          useFactory: mockRepository,
        },
        {
          provide: getRepositoryToken(BestSelling),
          useFactory: mockRepository,
        },
        {
          provide: getRepositoryToken(TodaysDeals),
          useFactory: mockRepository,
        },
      ],
    }).compile();

    service = module.get<AppService>(AppService);
    featuredItemsRepo = module.get(getRepositoryToken(FeaturedItems));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('addItem', () => {
    it('should add a new featuredItem', async () => {
      const newItem = { id: 1, image: 'image.jpg' } as FeaturedItems;
      (featuredItemsRepo.create as jest.Mock).mockReturnValue(newItem);
      (featuredItemsRepo.save as jest.Mock).mockResolvedValue(newItem);

      const result = await service.addItem('featuredItems', newItem);
      expect(result).toEqual(newItem);
      expect(featuredItemsRepo.create).toHaveBeenCalledWith(newItem);
      expect(featuredItemsRepo.save).toHaveBeenCalledWith(newItem);
    });
  });

  describe('updateItem', () => {
    it('should update an existing item', async () => {
      const updatedItem = { id: 1, image: 'image.jpg' } as FeaturedItems;
      (featuredItemsRepo.findOne as jest.Mock).mockResolvedValue({ id: 1 });
      (featuredItemsRepo.save as jest.Mock).mockResolvedValue(updatedItem);

      const result = await service.updateItem(
        'featuredItems',
        '1',
        updatedItem,
      );
      expect(result).toEqual(updatedItem);
    });

    it('should throw an error if item not found', async () => {
      (featuredItemsRepo.findOne as jest.Mock).mockResolvedValue(null);
      await expect(
        service.updateItem('featuredItems', '1', {}),
      ).rejects.toThrow('Item not found');
    });
  });

  describe('deleteItem', () => {
    it('should delete an item', async () => {
      const item = { id: 1 } as FeaturedItems;
      (featuredItemsRepo.findOne as jest.Mock).mockResolvedValue(item);
      await service.deleteItem('featuredItems', '1');
      expect(featuredItemsRepo.remove).toHaveBeenCalledWith(item);
    });

    it('should throw an error if item not found', async () => {
      (featuredItemsRepo.findOne as jest.Mock).mockResolvedValue(null);
      await expect(service.deleteItem('featuredItems', '1')).rejects.toThrow(
        'Item not found',
      );
    });
  });
});
