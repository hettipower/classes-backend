
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, JoinColumn } from 'typeorm';

import { Teacher } from './teacher.entity';
import { Registration } from './registration.entity';
import { ClassFee } from './class-fee.entity';
import { Subject } from './subject.entity';

@Entity()
export class ClassEntity {
    @PrimaryGeneratedColumn()
    class_id!: number;

    @Column()
    class_name!: string;

    @ManyToOne(() => Teacher, teacher => teacher.classes, { eager: true })
    teacher!: Teacher;

    @Column({ type: 'int', nullable: true })
    subject!: number;

    @ManyToOne(() => Subject)
    @JoinColumn({ name: 'subject' })
    subject_id!: Subject;

    @Column('decimal', { precision: 10, scale: 2 })
    registrationAmount!: number;

    @Column('decimal', { precision: 10, scale: 2 })
    classFeeAmount!: number;

    @OneToMany(() => Registration, registration => registration.classEntity, { cascade: true })
    registrations!: Registration[];

    @OneToMany(() => ClassFee, classFee => classFee.classEntity, { cascade: true })
    classFees!: ClassFee[];
}