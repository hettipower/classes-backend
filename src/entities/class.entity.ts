import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, CreateDateColumn } from 'typeorm';

import { Teacher } from './teacher.entity';
import { Subject } from './subject.entity';

@Entity()
export class ClassEntity {
    @PrimaryGeneratedColumn()
    class_id!: number;

    @Column()
    class_name!: string;

    @ManyToOne(() => Teacher, teacher => teacher.classes, { eager: true })
    teacher!: Teacher;

    @ManyToOne(() => Subject)
    @JoinColumn({ name: 'subject' })
    subject!: Subject;

    @Column('decimal', { precision: 10, scale: 2 })
    registrationAmount!: number;

    @Column('decimal', { precision: 10, scale: 2 })
    classFeeAmount!: number;

    @Column('decimal', { precision: 10, scale: 2 })
    commission!: number;

    @CreateDateColumn()
    createdAt!: Date;
}