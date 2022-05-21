import { Type } from "class-transformer";
import { IsDate, IsDateString, isInt, IsInt, IsNotEmpty, MaxLength, MinLength } from "class-validator";
import { Nivel } from "src/nivel/entities/nivel.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Desenvolvedor {

    @PrimaryGeneratedColumn()
    id: number;

    @IsNotEmpty({ message: "Nível do desenvolvedor é obrigatório!"})
    @IsInt({ message: "Nível do desenvolvedor deve ser um valor inteiro!"})
    @ManyToOne(() => Nivel, nivel => nivel.id)
    nivel: Nivel;

    @IsNotEmpty({ message: "Nome do desenvolvedor é obrigatório!"})
    @MinLength(1, { message: "Nome do desenvolvedor deve ter ao menos 1 caracter!"})
    @Column()
    nome: string;

    @IsNotEmpty({ message: "Nome do desenvolvedor é obrigatório!"})
    @MinLength(1, { message: "Nome do desenvolvedor deve ter ao menos 1 caracter!"})
    @MaxLength(1, { message: "Nome do desenvolvedor deve ter no máximo 1 caracter!"})
    @Column({
        type: "varchar",
        length: 1
    })
    sexo: string;

    @IsNotEmpty({ message: "Data de nascimento do desenvolvedor é obrigatório!"})
    @Type(() => Date)
    @IsDateString({ message: "Data de nascimento do desenvolvedor inválida!"})
    @Column({
        type: "date"
    })
    datanascimento: Date;

    @IsNotEmpty({ message: "Idade do desenvolvedor é obrigatório!"})
    @IsInt({ message: "idade do desenvolvedor deve ser um valor inteiro!"})
    @Column()
    idade: number;

    @Column()
    hobby: string;

}
