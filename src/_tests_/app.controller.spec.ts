import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from '../app.controller';
import { AppService } from '../app.service';
import { BestSelling, FeaturedItems, TodaysDeals } from '../app.entity';

const mockAppService = {
  getPaginatedItems: jest.fn(),
  addItem: jest.fn(),
  updateItem: jest.fn(),
  deleteItem: jest.fn(),
};

describe('AppController', () => {
  let controller: AppController;
  let appService: AppService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [{ provide: AppService, useValue: mockAppService }],
    }).compile();

    controller = module.get<AppController>(AppController);
    appService = module.get<AppService>(AppService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('getItems', () => {
    it('should return items for valid section', async () => {
      const paginatedData = { items: [{ id: 1, title: 'Item 1' }] };
      mockAppService.getPaginatedItems.mockResolvedValue(paginatedData);

      const result = await controller.getItems('featuredItems', '1', '10', '1');
      expect(result).toEqual(paginatedData.items);
      expect(mockAppService.getPaginatedItems).toHaveBeenCalledWith(
        'featuredItems',
        1,
        10,
        1,
      );
    });

    it('should return an error for invalid section', async () => {
      const result = await controller.getItems('invalidSection', '1', '10');
      expect(result).toEqual({
        message:
          'Invalid section. Please use: bestSelling, featuredItems, or todaysDeals.',
      });
    });
  });

  describe('addItem', () => {
    it('should add a new item', async () => {
      const newItem = { id: 1, title: 'New Item' } as FeaturedItems;
      mockAppService.addItem.mockResolvedValue(newItem);

      const result = await controller.addItem('featuredItems', newItem);
      expect(result).toEqual(newItem);
      expect(mockAppService.addItem).toHaveBeenCalledWith(
        'featuredItems',
        newItem,
      );
    });
  });

  describe('updateItem', () => {
    it('should update an existing item', async () => {
      const updatedItem = { id: 1, title: 'Updated Item' } as FeaturedItems;
      mockAppService.updateItem.mockResolvedValue(updatedItem);

      const result = await controller.updateItem(
        'featuredItems',
        '1',
        updatedItem,
      );
      expect(result).toEqual(updatedItem);
      expect(mockAppService.updateItem).toHaveBeenCalledWith(
        'featuredItems',
        '1',
        updatedItem,
      );
    });
  });

  describe('deleteItem', () => {
    it('should delete an item', async () => {
      mockAppService.deleteItem.mockResolvedValue(undefined);

      const result = await controller.deleteItem('featuredItems', '1');
      expect(result).toEqual({ message: 'Item deleted successfully' });
      expect(mockAppService.deleteItem).toHaveBeenCalledWith(
        'featuredItems',
        '1',
      );
    });
  });
});
