import { Test, TestingModule } from '@nestjs/testing';
import { AcademicPeriodController } from '@academic-period/controllers/academic-period.controller';
import { AcademicPeriodService } from '@academic-period/services/academic-period.service';

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
            findOne: jest.fn(),
            update: jest.fn(),
            remove: jest.fn(),
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