import { IsNotEmpty, MinLength } from "class-validator";

export class CreateNivelDto {

    @IsNotEmpty({ message: "Descrição do nível é obrigatório!"})
    @MinLength(1, { message: "Descrição do nível deve ter ao menos 1 caracter!"})
    nivel: string;

}
