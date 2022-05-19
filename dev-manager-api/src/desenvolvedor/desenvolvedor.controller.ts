import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { DesenvolvedorService } from './desenvolvedor.service';
import { CreateDesenvolvedorDto } from './dto/create-desenvolvedor.dto';
import { UpdateDesenvolvedorDto } from './dto/update-desenvolvedor.dto';

@Controller('desenvolvedor')
export class DesenvolvedorController {
  constructor(private readonly desenvolvedorService: DesenvolvedorService) {}

  @Post()
  create(@Body() createDesenvolvedorDto: CreateDesenvolvedorDto) {
    return this.desenvolvedorService.create(createDesenvolvedorDto);
  }

  @Get()
  findAll() {
    return this.desenvolvedorService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.desenvolvedorService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDesenvolvedorDto: UpdateDesenvolvedorDto) {
    return this.desenvolvedorService.update(+id, updateDesenvolvedorDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.desenvolvedorService.remove(+id);
  }
}
