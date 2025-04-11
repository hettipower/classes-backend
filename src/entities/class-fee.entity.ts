import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class ClassFee {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ type: 'date' })
    date!: string;

    @Column()
    count!: number;
}