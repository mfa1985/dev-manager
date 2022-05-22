import { Nivel } from "./nivel";

export class Desenvolvedor {
    id?: number;
    nivel?: Nivel;
    nome?: string;
    sexo?: string;
    datanascimento?: string;
    idade?: number;
    hobby?: string;

    constructor(
        id?: number,
        nivel?: Nivel,
        nome?: string,
        sexo?: string,
        datanascimento?: string,
        idade?: number,
        hobby?: string
    ) {
        this.id = id;
        this.nivel = nivel;
        this.nome = nome;
        this.sexo = sexo;
        this.datanascimento = datanascimento;
        this.idade = idade;
        this.hobby = hobby;
    }
}
