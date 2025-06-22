import { Test, TestingModule } from '@nestjs/testing';
import { TechnologyService } from '@technology/services/technology.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Technology } from '@technology/entities/technology.entity';

describe('TechnologyService', () => {
  let service: TechnologyService;
  let technologyRepository: Repository<Technology>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TechnologyService,
        {
          provide: getRepositoryToken(Technology),
          useValue: {
            findOne: jest.fn(),
            create: jest.fn(),
            save: jest.fn(),
            find: jest.fn(),
            findById: jest.fn(),
            findByName: jest.fn(),
            updateById: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<TechnologyService>(TechnologyService);
    technologyRepository = module.get<Repository<Technology>>(
      getRepositoryToken(Technology),
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
