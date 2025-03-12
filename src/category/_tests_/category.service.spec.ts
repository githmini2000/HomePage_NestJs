import { Test, TestingModule } from '@nestjs/testing';
import { CategoryService } from '../category.service';
import { Category } from '../category.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

const mockCategoryRepository = () => ({
  create: jest.fn(),
  save: jest.fn(),
  find: jest.fn(),
  findOne: jest.fn(),
});

describe('CategoryService', () => {
  let service: CategoryService;
  let categoryRepository: Repository<Category>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CategoryService,
        {
          provide: getRepositoryToken(Category),
          useFactory: mockCategoryRepository,
        },
      ],
    }).compile();

    service = module.get<CategoryService>(CategoryService);
    categoryRepository = module.get<Repository<Category>>(
      getRepositoryToken(Category),
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('createCategory', () => {
    it('should create and save a new category', async () => {
      const categoryName = 'New Category';
      const category = { id: 1, name: categoryName } as Category;

      (categoryRepository.create as jest.Mock).mockReturnValue(category);
      (categoryRepository.save as jest.Mock).mockResolvedValue(category);

      const result = await service.createCategory(categoryName);

      expect(result).toEqual(category);
      expect(categoryRepository.create).toHaveBeenCalledWith({
        name: categoryName,
      });
      expect(categoryRepository.save).toHaveBeenCalledWith(category);
    });
  });

  describe('getCategories', () => {
    it('should return an array of categories', async () => {
      const categories = [
        { id: 1, name: 'Category 1' } as Category,
        { id: 2, name: 'Category 2' } as Category,
      ];

      (categoryRepository.find as jest.Mock).mockResolvedValue(categories);

      const result = await service.getCategories();

      expect(result).toEqual(categories);
      expect(categoryRepository.find).toHaveBeenCalled();
    });
  });
});
