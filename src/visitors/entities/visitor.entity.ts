import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Visitor {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    name!: string;

    @Column()
    email!: string;

    @Column()
    visitDate!: Date;
}
