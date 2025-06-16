import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProjectService } from './project.service';
import { Project } from './project.entity';
import { People } from '../people/entities/people.entity';
import { AcademicPeriod } from '../academic-period/academic-period.entity';
import { Subject } from '../subject/subject.entity';
import { Category } from '../category/category.entity';
import { Technology } from '../technology/technology.entity';

describe('ProjectService', () => {
  let service: ProjectService;
  let projectRepository: Repository<Project>;
  let peopleRepository: Repository<People>;
  let academicPeriodRepository: Repository<AcademicPeriod>;
  let subjectRepository: Repository<Subject>;
  let categoryRepository: Repository<Category>;
  let technologyRepository: Repository<Technology>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProjectService,
        {
          provide: getRepositoryToken(Project),
          useValue: {
            create: jest.fn(),
            save: jest.fn(),
            find: jest.fn(),
            findOne: jest.fn(),
            remove: jest.fn(),
          },
        },
        {
          provide: getRepositoryToken(People),
          useValue: {
            findOne: jest.fn(),
          },
        },
        {
          provide: getRepositoryToken(AcademicPeriod),
          useValue: {
            findOne: jest.fn(),
          },
        },
        {
          provide: getRepositoryToken(Subject),
          useValue: {
            findOne: jest.fn(),
          },
        },
        {
          provide: getRepositoryToken(Category),
          useValue: {
            findOne: jest.fn(),
          },
        },
        {
          provide: getRepositoryToken(Technology),
          useValue: {
            findByIds: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<ProjectService>(ProjectService);
    projectRepository = module.get<Repository<Project>>(
      getRepositoryToken(Project),
    );
    peopleRepository = module.get<Repository<People>>(
      getRepositoryToken(People),
    );
    academicPeriodRepository = module.get<Repository<AcademicPeriod>>(
      getRepositoryToken(AcademicPeriod),
    );
    subjectRepository = module.get<Repository<Subject>>(
      getRepositoryToken(Subject),
    );
    categoryRepository = module.get<Repository<Category>>(
      getRepositoryToken(Category),
    );
    technologyRepository = module.get<Repository<Technology>>(
      getRepositoryToken(Technology),
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
