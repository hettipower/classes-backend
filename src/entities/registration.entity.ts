import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { ClassEntity } from './class.entity';

@Entity()
export class Registration {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ type: 'date' })
    date!: string;

    @Column()
    count!: number;

    @ManyToOne(() => ClassEntity, classEntity => classEntity.registrations)
    classEntity!: ClassEntity;
}