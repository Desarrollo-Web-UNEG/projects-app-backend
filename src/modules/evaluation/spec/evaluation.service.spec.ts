import { Test, TestingModule } from '@nestjs/testing';
import { EvaluationService } from '@evaluation/services/evaluation.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Evaluation } from '@evaluation/entities/evaluation.entity';
import { Project } from '@project/entities/project.entity';
import { People } from '@people/entities/people.entity';

describe('EvaluationService', () => {
  let service: EvaluationService;
  let evaluationRepository: Repository<Evaluation>;
  let projectRepository: Repository<Project>;
  let peopleRepository: Repository<People>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        EvaluationService,
        {
          provide: getRepositoryToken(Evaluation),
          useValue: {
            findOne: jest.fn(),
            create: jest.fn(),
            save: jest.fn(),
            find: jest.fn(),
            remove: jest.fn(),
          },
        },
        {
          provide: getRepositoryToken(Project),
          useValue: {
            findOne: jest.fn(),
          },
        },
        {
          provide: getRepositoryToken(People),
          useValue: {
            findOne: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<EvaluationService>(EvaluationService);
    evaluationRepository = module.get<Repository<Evaluation>>(
      getRepositoryToken(Evaluation),
    );
    projectRepository = module.get<Repository<Project>>(
      getRepositoryToken(Project),
    );
    peopleRepository = module.get<Repository<People>>(
      getRepositoryToken(People),
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
