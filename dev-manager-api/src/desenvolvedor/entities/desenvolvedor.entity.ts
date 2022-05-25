import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsDateString, IsInt, IsNotEmpty, MaxLength, MinLength } from "class-validator";
import { Nivel } from "../../nivel/entities/nivel.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Desenvolvedor {

    @ApiProperty()
    @PrimaryGeneratedColumn()
    id: number;

    @ApiProperty({ example: "1", description: "FkId do nível do desenvolvedor" })
    @IsNotEmpty({ message: "Nível do desenvolvedor é obrigatório!" })
    @IsInt({ message: "Nível do desenvolvedor deve ser um valor inteiro!" })
    @ManyToOne(() => Nivel, nivel => nivel.id)
    nivel: Nivel;

    @ApiProperty({ example: "João", description: "Nome do desenvolvedor" })
    @IsNotEmpty({ message: "Nome do desenvolvedor é obrigatório!" })
    @MinLength(1, { message: "Nome do desenvolvedor deve ter ao menos 1 caracter!" })
    @Column()
    nome: string;

    @ApiProperty({ example: "M", description: "Sexo do desenvolvedor, M para masculino e F para feminino" })
    @IsNotEmpty({ message: "Sexo do desenvolvedor é obrigatório!" })
    @MinLength(1, { message: "Sexo do desenvolvedor deve ter 1 caracter!" })
    @MaxLength(1, { message: "Sexo do desenvolvedor deve ter 1 caracter!" })
    @Column({
        type: "varchar",
        length: 1
    })
    sexo: string;

    @ApiProperty({ example: "2022-05-21", description: "Data de nascimento do desenvolvedor, formato YYYY-MM-DD" })
    @IsNotEmpty({ message: "Data de nascimento do desenvolvedor é obrigatório!" })
    @Type(() => Date)
    @IsDateString({ message: "Data de nascimento do desenvolvedor inválida!" })
    @Column({
        type: "date"
    })
    datanascimento: Date;

    @ApiProperty({ example: "18", description: "Idade do desenvolvedor" })
    @IsNotEmpty({ message: "Idade do desenvolvedor é obrigatório!" })
    @IsInt({ message: "idade do desenvolvedor deve ser um valor inteiro!" })
    @Column()
    idade: number;

    @ApiProperty({ example: "Futebol", description: "Hobby do desenvolvedor" })
    @Column()
    hobby: string;

}
