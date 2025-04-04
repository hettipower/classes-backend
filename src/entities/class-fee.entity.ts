import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { ClassEntity } from './class.entity';

@Entity()
export class ClassFee {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ type: 'date' })
    date!: string;

    @Column()
    count!: number;

    @ManyToOne(() => ClassEntity, classEntity => classEntity.classFees)
    classEntity!: ClassEntity;
}