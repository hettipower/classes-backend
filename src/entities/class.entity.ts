import { Teacher } from './teacher.entity';
import { Registration } from './registration.entity';
import { ClassFee } from './class-fee.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm';

@Entity()
export class ClassEntity {
    @PrimaryGeneratedColumn()
    id!: number;

    @ManyToOne(() => Teacher, teacher => teacher.classes, { eager: true })
    teacher!: Teacher;

    @Column()
    subject!: string;

    @Column('decimal', { precision: 10, scale: 2 })
    registrationAmount!: number;

    @Column('decimal', { precision: 10, scale: 2 })
    classFeeAmount!: number;

    @OneToMany(() => Registration, registration => registration.classEntity, { cascade: true })
    registrations!: Registration[];

    @OneToMany(() => ClassFee, classFee => classFee.classEntity, { cascade: true })
    classFees!: ClassFee[];
}