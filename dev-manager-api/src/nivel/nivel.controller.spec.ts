import { Test, TestingModule } from '@nestjs/testing';
import { NivelController } from './nivel.controller';
import { NivelService } from './nivel.service';

describe('NivelController', () => {
  let controller: NivelController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [NivelController],
      providers: [NivelService],
    }).compile();

    controller = module.get<NivelController>(NivelController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
