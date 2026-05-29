import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { ApiProperty } from "@nestjs/swagger";

@Entity()
export class Visitor {
    @ApiProperty({
        description: 'Identificador único do visitante',
        example: 1,
        type: 'number'
    })
    @PrimaryGeneratedColumn('uuid')
    id!: string;

    @ApiProperty({
        description: 'Nome completo do visitante',
        example: 'João Silva Santos',
        type: 'string'
    })
    @Column()
    name!: string;

    @ApiProperty({
        description: 'Email do visitante',
        example: 'joao@example.com',
        type: 'string',
        format: 'email'
    })
    @Column()
    email!: string;

    @ApiProperty({
        description: 'Telefone do visitante',
        example: '(11) 99999-9999',
        type: 'string'
    })
    @Column()
    phone!: string;

    @Column({ nullable: true })
    quantityOfVisits!: number;

    @Column({ nullable: true })
    churchName!: string;

    @Column({ type: 'date', nullable: true })
    visitDate!: Date;
}
