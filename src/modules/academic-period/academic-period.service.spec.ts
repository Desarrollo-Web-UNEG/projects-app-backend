import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AcademicPeriodService } from './academic-period.service';
import { AcademicPeriod } from './academic-period.entity';

describe('AcademicPeriodService', () => {
  let service: AcademicPeriodService;
  let repository: Repository<AcademicPeriod>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AcademicPeriodService,
        {
          provide: getRepositoryToken(AcademicPeriod),
          useValue: {
            create: jest.fn(),
            save: jest.fn(),
            find: jest.fn(),
            findOne: jest.fn(),
            remove: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<AcademicPeriodService>(AcademicPeriodService);
    repository = module.get<Repository<AcademicPeriod>>(getRepositoryToken(AcademicPeriod));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
}); 