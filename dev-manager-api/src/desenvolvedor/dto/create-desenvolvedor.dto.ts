import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsDate, IsInt, IsNotEmpty, MaxLength, MinLength } from "class-validator";
import { Nivel } from "src/nivel/entities/nivel.entity";

export class CreateDesenvolvedorDto {

    @ApiProperty({ example: "1", description: "FkId do nível do desenvolvedor" })
    nivel: Nivel;

    @ApiProperty({ example: "João", description: "Nome do desenvolvedor" })
    nome: string;

    @ApiProperty({ example: "M", description: "Sexo do desenvolvedor, M para masculino e F para feminino" })
    sexo: string;

    @ApiProperty({ example: "2022-05-21", description: "Data de nascimento do desenvolvedor, formato YYYY-MM-DD" })
    datanascimento: Date;

    @ApiProperty({ example: "18", description: "Idade do desenvolvedor" })
    idade: number;

    @ApiProperty({ example: "Futebol", description: "Hobby do desenvolvedor" })
    hobby: string;

}
