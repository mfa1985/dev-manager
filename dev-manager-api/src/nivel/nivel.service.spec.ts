import { Test, TestingModule } from '@nestjs/testing';
import { CreateNivelDto } from './dto/create-nivel.dto';
import { UpdateNivelDto } from './dto/update-nivel.dto';
import { Nivel } from './entities/nivel.entity';
import { NivelService } from './nivel.service';

const nivelEntityList: Nivel[] = [
  new Nivel({ id: 0, nivel: 'Junior' }),
  new Nivel({ id: 1, nivel: 'Pleno' }),
  new Nivel({ id: 2, nivel: 'Senior' })
]

const updateNivelDto = {
  nivel: 'Junior B'
}

describe('NivelService', () => {
  let nivelService: NivelService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [{
        provide: NivelService,
        useValue: {
          create: jest.fn().mockResolvedValue(nivelEntityList),
          findAll: jest.fn(),
          findPaginate: jest.fn(),
          findOne: jest.fn().mockResolvedValue(nivelEntityList[0]),
          update: jest.fn().mockResolvedValue(updateNivelDto),
          remove: jest.fn(),
          nivelFromDTO: jest.fn(),
        }
      }],
    }).compile();

    nivelService = module.get<NivelService>(NivelService);
  });

  // it('should be defined', () => {
  //   expect(nivelService).toBeDefined();
  // });

  describe('create', () => {
    it('Esperamos criar um novo nivel com sucesso', async () => {
      // Arrange
      const body: CreateNivelDto = {
        nivel: "Junior"
      }
      //Act
      const result = await nivelService.create(body);
      // Assert
      expect(result).toEqual(nivelEntityList);

    });
  })

  describe('create', () => {
    it('Esperamos atualizar um nivel com sucesso', async () => {
      // Arrange
      const body: UpdateNivelDto = {
        nivel: "Junior B"
      }
      //Act
      const result = await nivelService.update(0,body);
      // Assert
      expect(result).toEqual(updateNivelDto);

    });
  })
});
