import { Entity, PrimaryGeneratedColumn, Column, OneToMany, JoinColumn, ManyToOne } from 'typeorm';
import { ClassEntity } from './class.entity';
import { Subject } from './subject.entity';
@Entity()
export class Teacher {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    name!: string;

    @Column({ unique: true })
    email!: string;

    @Column()
    contactNo!: string;

    @Column({ type: 'int', nullable: true })
    teachingSubject!: number;

    @ManyToOne(() => Subject)
    @JoinColumn({ name: 'teachingSubject' })
    subject_name!: Subject;

    // One teacher can have many classes
    @OneToMany(() => ClassEntity, classEntity => classEntity.teacher)
    classes!: ClassEntity[];
}