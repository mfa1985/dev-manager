import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateDesenvolvedorDto } from './dto/create-desenvolvedor.dto';
import { UpdateDesenvolvedorDto } from './dto/update-desenvolvedor.dto';
import { Desenvolvedor } from './entities/desenvolvedor.entity';
import { IPaginationOptions, paginate, Pagination } from 'nestjs-typeorm-paginate';

@Injectable()
export class DesenvolvedorService {

  constructor(
    @InjectRepository(Desenvolvedor)
    private devRepository: Repository<Desenvolvedor>,
  ) { }

  create(createDesenvolvedorDto: CreateDesenvolvedorDto) {
    return this.devRepository.save(createDesenvolvedorDto);
  }

  findAll() {
    return this.devRepository.find({ relations: ['nivel']});
  }

  findPaginate(options: IPaginationOptions, queryParameter): Promise<Pagination<Desenvolvedor>> {
    const query = this.devRepository.createQueryBuilder('d').leftJoinAndSelect("d.nivel", "nivel");
    if (queryParameter){
      query.where("d.nome like :queryParameter", {queryParameter: '%' + queryParameter + '%'}).getMany();
    }
    return paginate<Desenvolvedor>(query,options);
  }

  findOne(id: number) {
    return this.devRepository.findOne(id,{ relations: ['nivel']});
  }

  update(id: number, updateDesenvolvedorDto: UpdateDesenvolvedorDto) {
    return this.devRepository.update(id, this.desenvolvedorFromDTO(updateDesenvolvedorDto)).then(() => {
      return this.devRepository.findOne(id);
    });
  }

  remove(id: number) {
    return this.devRepository.delete(id);
  }

  desenvolvedorFromDTO(devDTO: CreateDesenvolvedorDto | UpdateDesenvolvedorDto) {
    const dev = new Desenvolvedor();
    dev.nivel = devDTO.nivel;
    dev.nome = devDTO.nome;
    dev.sexo = devDTO.sexo;
    dev.datanascimento = devDTO.datanascimento;
    dev.idade = devDTO.idade;
    dev.hobby = devDTO.hobby;
    return dev;
  }

  count(id: number){
    return this.devRepository.count({where:{nivel: id}});
  }
}
