import { Entity, PrimaryGeneratedColumn, Column, OneToMany, JoinColumn, ManyToOne, ManyToMany, JoinTable } from 'typeorm';
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

    @ManyToMany(() => Subject)
    @JoinTable({
        name: 'teacher_subjects',
        joinColumn: {
            name: 'teacher_id',
            referencedColumnName: 'id'
        },
        inverseJoinColumn: {
            name: 'subject_id',
            referencedColumnName: 'subject_id'
        }
    })
    subjects!: Subject[];

    // One teacher can have many classes
    @OneToMany(() => ClassEntity, classEntity => classEntity.teacher)
    classes!: ClassEntity[];
}