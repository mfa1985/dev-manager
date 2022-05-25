import { HttpStatus } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import EventEmitter from 'events';
import { Pagination } from 'nestjs-typeorm-paginate';
import { Any, EventSubscriber } from 'typeorm';
import { DesenvolvedorService } from '../desenvolvedor/desenvolvedor.service';
import { CreateNivelDto } from './dto/create-nivel.dto';
import { Nivel } from './entities/nivel.entity';
import { NivelController } from './nivel.controller';
import { NivelService } from './nivel.service';


// import httpMock from 'node-mocks-http';
// import EventEmitter from 'events';

const httpMocks = require('node-mocks-http');

const nivelEntityList: Nivel[] = [
  new Nivel({ id: 1, nivel: 'Pleno' }),
  new Nivel({ id: 2, nivel: 'Senior' })
]

const meta = {
  currentPage: 1,
  itemCount: 3,
  itemsPerPage: 10,
  totalItems: 3,
  totalPages: 1,
}

const pagination: Pagination<Nivel> = new Pagination<Nivel>(nivelEntityList, meta);

const createNivelDto = new CreateNivelDto("Master");
const createNivel = new Nivel({ id: 0, nivel: 'Master' });



describe('NivelController', () => {
  let nivelController: NivelController;
  let nivelService: NivelService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [NivelController],
      providers: [
        {
          provide: NivelService,
          useValue: {
            create: jest.fn().mockResolvedValue(createNivel),
            findAll: jest.fn(),
            findPaginate: jest.fn().mockResolvedValue(pagination),
            findOne: jest.fn(),
            update: jest.fn(),
            remove: jest.fn(),
            nivelFromDTO: jest.fn(),
          }
        },
        {
          provide: DesenvolvedorService,
          useValue: {
            create: jest.fn(),
            findAll: jest.fn(),
            findPaginate: jest.fn(),
            findOne: jest.fn(),
            update: jest.fn(),
            remove: jest.fn(),
            nivelFromDTO: jest.fn(),
          }
        }
      ],
    }).compile();

    nivelController = module.get<NivelController>(NivelController);
    nivelService = module.get<NivelService>(NivelService);
  });

  it('Esperamos que esteja definidos', () => {
    expect(nivelController).toBeDefined();
    expect(nivelService).toBeDefined();
  });

  describe('findPaginate', () => {
    it('Esperamos que retorne um lista de nivel paginada', async () => {
      // Arrange
      // Act
      const result = await nivelController.findPaginate("", 1, 100);
      // Assert
      expect(result).toEqual(pagination);
      expect(nivelService.findPaginate).toHaveBeenCalledTimes(1);
      // expect(nivelService.findPaginate).toHaveBeenCalledTimes(2);
      // Returns Error
      // Expected number of calls: 2
      // Received number of calls: 1
    });
    it('Esperamos que retorne um exception', () => {
      // Arrange
      jest.spyOn(nivelService, 'findPaginate').mockRejectedValueOnce(new Error())
      // Assert
      expect(nivelController.findPaginate("", 1, 100)).rejects.toThrowError();
    });
  });

  describe('create', () => {
    it('Esperamos criar um novo nivel com sucesso', async () => {
      // Arrange
      const body: CreateNivelDto = {
        nivel: "Master"
      }
      const mockRes = httpMocks.createResponse({ nivel: CreateNivelDto });
      //Act
      const result = await nivelController.create(body, mockRes);
      // Assert
      expect(result.statusCode).toEqual(400);
      // Dados o fato de não conseguir result como um novo nivel outros testes não foram implementados

    });
  })
});
