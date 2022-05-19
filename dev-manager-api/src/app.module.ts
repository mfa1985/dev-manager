import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { NivelModule } from './nivel/nivel.module';
import { DesenvolvedorModule } from './desenvolvedor/desenvolvedor.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Nivel } from './nivel/entities/nivel.entity';
import { Desenvolvedor } from './desenvolvedor/entities/desenvolvedor.entity';
require('dotenv').config();

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      entities: [Nivel, Desenvolvedor],
      synchronize: true,
    }),
    NivelModule, 
    DesenvolvedorModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
