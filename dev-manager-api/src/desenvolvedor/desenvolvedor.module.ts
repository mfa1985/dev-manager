import { Module } from '@nestjs/common';
import { DesenvolvedorService } from './desenvolvedor.service';
import { DesenvolvedorController } from './desenvolvedor.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Desenvolvedor } from './entities/desenvolvedor.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Desenvolvedor])
  ],
  controllers: [DesenvolvedorController],
  providers: [DesenvolvedorService]
})
export class DesenvolvedorModule {}
