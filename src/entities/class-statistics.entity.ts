import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, CreateDateColumn } from 'typeorm';
import { Teacher } from './teacher.entity';
import { ClassEntity } from './class.entity';

@Entity()
export class ClassStatistics {
    @PrimaryGeneratedColumn()
    id!: number;

    @ManyToOne(() => Teacher)
    @JoinColumn({ name: 'teacher_id' })
    teacher!: Teacher;

    @ManyToOne(() => ClassEntity)
    @JoinColumn({ name: 'class_id' })
    class!: ClassEntity;

    @Column({ type: 'date' })
    date!: Date;

    @Column({ default: 0 })
    totalRegistrations!: number;

    @Column('decimal', { precision: 10, scale: 2, default: 0 })
    totalClassFee!: number;

    @CreateDateColumn()
    createdAt!: Date;
} 