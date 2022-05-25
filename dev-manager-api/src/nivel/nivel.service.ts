import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateNivelDto } from './dto/create-nivel.dto';
import { UpdateNivelDto } from './dto/update-nivel.dto';
import { Nivel } from './entities/nivel.entity';
import { IPaginationOptions, paginate, Pagination } from 'nestjs-typeorm-paginate';
import { Desenvolvedor } from '../desenvolvedor/entities/desenvolvedor.entity';

@Injectable()
export class NivelService {

  constructor(
    @InjectRepository(Nivel)
    private nivelRepository: Repository<Nivel>,
  ) { }

  create(createNivelDto: CreateNivelDto) {
    return this.nivelRepository.save(createNivelDto);
  }

  findAll() {
    return this.nivelRepository.find();
  }

  findPaginate(options: IPaginationOptions, queryParameter): Promise<Pagination<Nivel>> {
    const query = this.nivelRepository.createQueryBuilder('n')
    .leftJoinAndMapMany('n.desenvolvedores', Desenvolvedor, 'desenvolvedor', 'desenvolvedor.nivel = n.id');
    if (queryParameter){
      query.where("n.nivel like :queryParameter", {queryParameter: '%' + queryParameter + '%'}).getMany();
    }
    return paginate<Nivel>(query,options);
  }

  findOne(id: number) {
    return this.nivelRepository.findOne(id);
  }

  update(id: number, updateNivelDto: UpdateNivelDto) {
    return this.nivelRepository.update(id, this.nivelFromDTO(updateNivelDto)).then(() => {
      return this.nivelRepository.findOne(id);
    });
  }

  remove(id: number) {
    return this.nivelRepository.delete(id);
  }

  nivelFromDTO(nivelDTO: CreateNivelDto | UpdateNivelDto) {
    const nivel = new Nivel();
    nivel.nivel = nivelDTO.nivel;
    return nivel;
  }

}
