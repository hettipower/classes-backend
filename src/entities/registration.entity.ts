import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Registration {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ type: 'date' })
    date!: string;

    @Column()
    count!: number;
}