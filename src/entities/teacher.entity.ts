import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { ClassEntity } from './class.entity';

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

    @Column()
    teachingSubject!: string;

    // One teacher can have many classes
    @OneToMany(() => ClassEntity, classEntity => classEntity.teacher)
    classes!: ClassEntity[];
}