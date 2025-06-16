import { Test, TestingModule } from '@nestjs/testing';
import { AcademicPeriodController } from './academic-period.controller';
import { AcademicPeriodService } from './academic-period.service';

describe('AcademicPeriodController', () => {
  let controller: AcademicPeriodController;
  let service: AcademicPeriodService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AcademicPeriodController],
      providers: [
        {
          provide: AcademicPeriodService,
          useValue: {
            create: jest.fn(),
            findAll: jest.fn(),
            findById: jest.fn(),
            update: jest.fn(),
            delete: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<AcademicPeriodController>(AcademicPeriodController);
    service = module.get<AcademicPeriodService>(AcademicPeriodService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
}); 