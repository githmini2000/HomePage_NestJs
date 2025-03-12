import { Test, TestingModule } from '@nestjs/testing';
import { CategoryController } from '../category.controller';
import { CategoryService } from '../category.service';

describe('CategoryController', () => {
  let controller: CategoryController;
  let categoryService: CategoryService;

  const mockCategoryService = {
    createCategory: jest.fn(),
    getCategories: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CategoryController],
      providers: [
        {
          provide: CategoryService,
          useValue: mockCategoryService,
        },
      ],
    }).compile();

    controller = module.get<CategoryController>(CategoryController);
    categoryService = module.get<CategoryService>(CategoryService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('createCategory', () => {
    it('should call CategoryService.createCategory and return the created category', async () => {
      const categoryName = 'New Category';
      const createdCategory = { id: 1, name: categoryName };

      mockCategoryService.createCategory.mockResolvedValue(createdCategory);

      const result = await controller.createCategory(categoryName);
      expect(result).toEqual(createdCategory);
      expect(mockCategoryService.createCategory).toHaveBeenCalledWith(
        categoryName,
      );
    });
  });

  describe('getCategories', () => {
    it('should call CategoryService.getCategories and return a list of categories', async () => {
      const categories = [
        { id: 1, name: 'Category 1' },
        { id: 2, name: 'Category 2' },
      ];

      mockCategoryService.getCategories.mockResolvedValue(categories);

      const result = await controller.getCategories();

      expect(result).toEqual(categories);
      expect(mockCategoryService.getCategories).toHaveBeenCalled();
    });
  });
});
