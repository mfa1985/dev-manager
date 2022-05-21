import { Module } from '@nestjs/common';
import { NivelService } from './nivel.service';
import { NivelController } from './nivel.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Nivel } from './entities/nivel.entity';
import { DesenvolvedorService } from 'src/desenvolvedor/desenvolvedor.service';
import { Desenvolvedor } from 'src/desenvolvedor/entities/desenvolvedor.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Nivel, Desenvolvedor])
  ],
  controllers: [NivelController],
  providers: [NivelService, DesenvolvedorService]
})
export class NivelModule {}
