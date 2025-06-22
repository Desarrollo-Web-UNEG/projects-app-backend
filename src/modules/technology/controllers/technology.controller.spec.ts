import { Test, TestingModule } from '@nestjs/testing';
import { TechnologyController } from '@technology/controllers/technology.controller';
import { TechnologyService } from '@technology/services/technology.service';

describe('TechnologyController', () => {
  let controller: TechnologyController;
  let service: TechnologyService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TechnologyController],
      providers: [
        {
          provide: TechnologyService,
          useValue: {
            create: jest.fn(),
            findAll: jest.fn(),
            findById: jest.fn(),
            updateById: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<TechnologyController>(TechnologyController);
    service = module.get<TechnologyService>(TechnologyService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
