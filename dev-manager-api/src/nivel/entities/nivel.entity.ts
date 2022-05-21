import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, MinLength } from "class-validator";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Nivel {

    @ApiProperty()
    @PrimaryGeneratedColumn()
    id: number;

    @ApiProperty({ example: "Pleno", description: "Níveis do desenvolvedor" })
    @IsNotEmpty({ message: "Descrição do nível é obrigatório!" })
    @MinLength(1, { message: "Descrição do nível deve ter ao menos 1 caracter!" })
    @Column({
        unique: true
    })
    nivel: string;

}
