import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateNivelDto } from './dto/create-nivel.dto';
import { UpdateNivelDto } from './dto/update-nivel.dto';
import { Nivel } from './entities/nivel.entity';

@Injectable()
export class NivelService {

  constructor(
      @InjectRepository(Nivel)
      private nivelRepository: Repository<Nivel>,
  ){}

  create(createNivelDto: CreateNivelDto) {
    return this.nivelRepository.save(createNivelDto);
  }

  findAll() {
    return this.nivelRepository.find();
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

  nivelFromDTO(nivelDTO:CreateNivelDto|UpdateNivelDto) {
    const nivel = new Nivel();
    nivel.nivel = nivelDTO.nivel;
    return nivelDTO;
  }
  
}
