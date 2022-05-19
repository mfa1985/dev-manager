import { Injectable } from '@nestjs/common';
import { CreateDesenvolvedorDto } from './dto/create-desenvolvedor.dto';
import { UpdateDesenvolvedorDto } from './dto/update-desenvolvedor.dto';

@Injectable()
export class DesenvolvedorService {
  create(createDesenvolvedorDto: CreateDesenvolvedorDto) {
    return 'This action adds a new desenvolvedor';
  }

  findAll() {
    return `This action returns all desenvolvedor`;
  }

  findOne(id: number) {
    return `This action returns a #${id} desenvolvedor`;
  }

  update(id: number, updateDesenvolvedorDto: UpdateDesenvolvedorDto) {
    return `This action updates a #${id} desenvolvedor`;
  }

  remove(id: number) {
    return `This action removes a #${id} desenvolvedor`;
  }
}
