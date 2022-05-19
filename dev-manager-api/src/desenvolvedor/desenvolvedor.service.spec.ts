import { Test, TestingModule } from '@nestjs/testing';
import { DesenvolvedorService } from './desenvolvedor.service';

describe('DesenvolvedorService', () => {
  let service: DesenvolvedorService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DesenvolvedorService],
    }).compile();

    service = module.get<DesenvolvedorService>(DesenvolvedorService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
