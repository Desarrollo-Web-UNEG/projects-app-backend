import { Test, TestingModule } from '@nestjs/testing';
import { SubjectService } from '@subject/services/subject.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Subject } from '@subject/entities/subject.entity';

describe('SubjectService', () => {
  let service: SubjectService;
  let subjectRepository: Repository<Subject>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SubjectService,
        {
          provide: getRepositoryToken(Subject),
          useValue: {
            findOne: jest.fn(),
            create: jest.fn(),
            save: jest.fn(),
            find: jest.fn(),
            findById: jest.fn(),
            findByName: jest.fn(),
            updateById: jest.fn(),
            deleteById: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<SubjectService>(SubjectService);
    subjectRepository = module.get<Repository<Subject>>(
      getRepositoryToken(Subject),
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
