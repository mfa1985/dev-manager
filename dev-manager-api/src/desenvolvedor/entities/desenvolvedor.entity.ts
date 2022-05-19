import { Nivel } from "src/nivel/entities/nivel.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Desenvolvedor {

    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => Nivel, nivel => nivel.id)
    nivel: Nivel;

    @Column()
    nome: string;

    @Column({
        type: "varchar",
        length: 1,
        unique: true
    })
    sexo: string;

    @Column({
        type: "date"
    })
    datanascimento: Date;

    @Column()
    idade: number;

    @Column()
    hobby: string;

}
