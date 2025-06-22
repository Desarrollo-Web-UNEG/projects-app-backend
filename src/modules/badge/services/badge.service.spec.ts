import { Test, TestingModule } from '@nestjs/testing';
import { BadgeService } from './badge.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Badge } from '@badge/entities/badge.entity';

describe('BadgeService', () => {
  let service: BadgeService;
  let badgeRepository: Repository<Badge>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BadgeService,
        {
          provide: getRepositoryToken(Badge),
          useValue: {
            findOne: jest.fn(),
            create: jest.fn(),
            save: jest.fn(),
            find: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<BadgeService>(BadgeService);
    badgeRepository = module.get<Repository<Badge>>(getRepositoryToken(Badge));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
