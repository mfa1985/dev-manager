import { Controller, Get, Post, Body, Patch, Param, Delete, Res, HttpStatus, Put } from '@nestjs/common';
import { validate } from 'class-validator';
import { Response } from 'express';
import { DesenvolvedorService } from './desenvolvedor.service';
import { CreateDesenvolvedorDto } from './dto/create-desenvolvedor.dto';
import { UpdateDesenvolvedorDto } from './dto/update-desenvolvedor.dto';

@Controller('desenvolvedor')
export class DesenvolvedorController {
  constructor(private readonly devService: DesenvolvedorService) {}

  @Post()
  async create(@Body() createDesenvolvedorDto: CreateDesenvolvedorDto, @Res() res: Response): Promise<any>  {
    try {
      // const error = await validate(createDesenvolvedorDto);
      const error = await validate(this.devService.desenvolvedorFromDTO(createDesenvolvedorDto));
      if (error.length > 0) {
        return res.status(HttpStatus.BAD_REQUEST).send(error);
      }
      return res.status(HttpStatus.CREATED).json(await this.devService.create(createDesenvolvedorDto));
    } catch (e) {
      return res.status(HttpStatus.BAD_REQUEST).send(e);
    }
  }

  @Get()
  findAll() {
    return this.devService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.devService.findOne(+id);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() updateDesenvolvedorDto: UpdateDesenvolvedorDto, @Res() res: Response): Promise<any> {
    const dev = await this.devService.findOne(+id);
    if (dev){
      try{
        const nivel = await this.devService.update(+id, updateDesenvolvedorDto);
        return res.status(HttpStatus.OK).json(nivel);
      } catch (error) {
        return res.status(HttpStatus.BAD_REQUEST).send(error);
      }
    } else {
      return res.status(HttpStatus.NOT_FOUND).send("Desenvolvedor com id " + +id + " não encontrado!");  
    }
  }

  @Patch(':id')
  async patch(@Param('id') id: string, @Body() updateDesenvolvedorDto: UpdateDesenvolvedorDto, @Res() res: Response) {
    return this.update(id, updateDesenvolvedorDto, res);
  }

  @Delete(':id')
  async remove(@Param('id') id: string, @Res() res: Response) {
    const dev = await this.devService.findOne(+id);
    if (dev){    
      try {
        await this.devService.remove(+id);
        return res.status(HttpStatus.NO_CONTENT).send();
      } catch (error) {
        return res.status(HttpStatus.BAD_REQUEST).json(error);
      }
    } else {
      return res.status(HttpStatus.NOT_FOUND).send("Desenvolvedor com id " + +id + " não encontrado!");  
    }
  }
}
