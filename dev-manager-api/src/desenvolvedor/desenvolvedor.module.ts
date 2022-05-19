import { Module } from '@nestjs/common';
import { DesenvolvedorService } from './desenvolvedor.service';
import { DesenvolvedorController } from './desenvolvedor.controller';

@Module({
  controllers: [DesenvolvedorController],
  providers: [DesenvolvedorService]
})
export class DesenvolvedorModule {}
