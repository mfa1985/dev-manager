import { Controller, Get, Post, Body, Patch, Param, Delete, Res, HttpStatus, Put } from '@nestjs/common';
import { NivelService } from './nivel.service';
import { CreateNivelDto } from './dto/create-nivel.dto';
import { UpdateNivelDto } from './dto/update-nivel.dto';
import { validate } from 'class-validator';
import { Response } from 'express';
import { DesenvolvedorService } from 'src/desenvolvedor/desenvolvedor.service';

@Controller('nivel')
export class NivelController {
  constructor(
    private readonly nivelService: NivelService,
    private readonly devService: DesenvolvedorService
  ) { }

  @Post()
  async create(@Body() createNivelDto: CreateNivelDto, @Res() res: Response): Promise<any> {
    try {
      // const error = await validate(createNivelDto);
      const error = await validate(this.nivelService.nivelFromDTO(createNivelDto));
      if (error.length > 0) {
        return res.status(HttpStatus.BAD_REQUEST).send(error);
      }
      return res.status(HttpStatus.CREATED).json(await this.nivelService.create(createNivelDto));
    } catch (e) {
      return res.status(HttpStatus.BAD_REQUEST).send(e);
    }
  }

  @Get()
  findAll() {
    return this.nivelService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.nivelService.findOne(+id);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() updateNivelDto: UpdateNivelDto, @Res() res: Response): Promise<any> {
    const nivel = await this.nivelService.findOne(+id);
    if (nivel) {
      try {
        const nivel = await this.nivelService.update(+id, updateNivelDto);
        return res.status(HttpStatus.OK).json(nivel);
      } catch (error) {
        return res.status(HttpStatus.BAD_REQUEST).send(error);
      }
    } else {
      return res.status(HttpStatus.NOT_FOUND).send("Nivel com id " + +id + " não encontrado!");
    }
  }

  @Patch(':id')
  async patch(@Param('id') id: string, @Body() updateNivelDto: UpdateNivelDto, @Res() res: Response) {
    return await this.update(id, updateNivelDto, res);
  }

  @Delete(':id')
  async remove(@Param('id') id: string, @Res() res: Response) {
    const nivel = await this.nivelService.findOne(+id);
    if (nivel) {
      const countDevs = await this.devService.count(+id);
      if (countDevs > 0) {
        return res.status(HttpStatus.NOT_IMPLEMENTED).send("Nivel com id " + +id + " possui desenvolvedores associados!");
      } else {
        try {
          await this.nivelService.remove(+id);
          return res.status(HttpStatus.NO_CONTENT).send();
        } catch (error) {
          return res.status(HttpStatus.BAD_REQUEST).json(error);
        }
      }
    } else {
      return res.status(HttpStatus.NOT_FOUND).send("Nivel com id " + +id + " não encontrado!");
    }
  }
}
