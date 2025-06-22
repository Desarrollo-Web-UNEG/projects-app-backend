import { Test, TestingModule } from '@nestjs/testing';
import { EvaluationController } from '@evaluation/controllers/evaluation.controller';
import { EvaluationService } from '@evaluation/services/evaluation.service';

describe('EvaluationController', () => {
  let controller: EvaluationController;
  let service: EvaluationService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EvaluationController],
      providers: [
        {
          provide: EvaluationService,
          useValue: {
            create: jest.fn(),
            findAll: jest.fn(),
            findById: jest.fn(),
            updateById: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<EvaluationController>(EvaluationController);
    service = module.get<EvaluationService>(EvaluationService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
