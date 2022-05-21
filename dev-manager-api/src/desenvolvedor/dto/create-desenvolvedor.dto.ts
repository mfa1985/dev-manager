import { Type } from "class-transformer";
import { IsDate, IsInt, IsNotEmpty, MaxLength, MinLength } from "class-validator";
import { Nivel } from "src/nivel/entities/nivel.entity";

export class CreateDesenvolvedorDto {

    // @IsNotEmpty({ message: "Nível é obrigatório!"})
    nivel: Nivel;

    // @IsNotEmpty({ message: "Nome do desenvolvedor é obrigatório!"})
    // @MinLength(1, { message: "Nome do desenvolvedor deve ter ao menos 1 caracter!"})
    nome: string;

    // @IsNotEmpty({ message: "Nome do desenvolvedor é obrigatório!"})
    // @MinLength(1, { message: "Nome do desenvolvedor deve ter ao menos 1 caracter!"})
    // @MaxLength(1, { message: "Nome do desenvolvedor deve ter no máximo 1 caracter!"})
    sexo: string;

    // @IsNotEmpty({ message: "Data de nascimento do desenvolvedor é obrigatório!"})
    // @Type(() => Date)
    // @IsDate({ message: "Data de nascimento do desenvolvedor inválida!"})
    datanascimento: Date;

    // @IsNotEmpty({ message: "Idade do desenvolvedor é obrigatório!"})
    // @IsInt({ message: "idade do desenvolvedor deve ser um valor inteiro!"})
    idade: number;

    hobby: string;

}
