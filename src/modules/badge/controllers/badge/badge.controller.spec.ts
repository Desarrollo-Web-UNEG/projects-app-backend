import { Test, TestingModule } from '@nestjs/testing';
import { BadgeController } from './badge.controller';
import { BadgeService } from '@badge/services/badge.service';

describe('BadgeController', () => {
  let controller: BadgeController;
  let service: BadgeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BadgeController],
      providers: [
        {
          provide: BadgeService,
          useValue: {
            create: jest.fn(),
            findAll: jest.fn(),
            findById: jest.fn(),
            updateById: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<BadgeController>(BadgeController);
    service = module.get<BadgeService>(BadgeService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
