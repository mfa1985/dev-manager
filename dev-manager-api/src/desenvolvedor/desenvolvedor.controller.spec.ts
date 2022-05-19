import { Test, TestingModule } from '@nestjs/testing';
import { DesenvolvedorController } from './desenvolvedor.controller';
import { DesenvolvedorService } from './desenvolvedor.service';

describe('DesenvolvedorController', () => {
  let controller: DesenvolvedorController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DesenvolvedorController],
      providers: [DesenvolvedorService],
    }).compile();

    controller = module.get<DesenvolvedorController>(DesenvolvedorController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
