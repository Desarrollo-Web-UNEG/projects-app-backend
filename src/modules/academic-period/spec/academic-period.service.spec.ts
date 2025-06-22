import { Test, TestingModule } from '@nestjs/testing';
import { AcademicPeriodService } from '@academic-period/services/academic-period.service';
import { AcademicPeriodRepository } from '@academic-period/services/academic-period.repository';

describe('AcademicPeriodService', () => {
  let service: AcademicPeriodService;
  let academicPeriodRepository: AcademicPeriodRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AcademicPeriodService,
        {
          provide: AcademicPeriodRepository,
          useValue: {
            create: jest.fn(),
            findAll: jest.fn(),
            findById: jest.fn(),
            findByIdWithProjects: jest.fn(),
            update: jest.fn(),
            remove: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<AcademicPeriodService>(AcademicPeriodService);
    academicPeriodRepository = module.get<AcademicPeriodRepository>(
      AcademicPeriodRepository,
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
