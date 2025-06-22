import { Test, TestingModule } from '@nestjs/testing';
import { SubjectController } from '@subject/controllers/subject.controller';
import { SubjectService } from '@subject/services/subject.service';

describe('SubjectController', () => {
  let controller: SubjectController;
  let service: SubjectService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SubjectController],
      providers: [
        {
          provide: SubjectService,
          useValue: {
            create: jest.fn(),
            findAll: jest.fn(),
            findById: jest.fn(),
            updateById: jest.fn(),
            deleteById: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<SubjectController>(SubjectController);
    service = module.get<SubjectService>(SubjectService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
