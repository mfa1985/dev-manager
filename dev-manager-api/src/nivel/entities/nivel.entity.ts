import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Nivel {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        unique: true
    })
    nivel: string;

}
