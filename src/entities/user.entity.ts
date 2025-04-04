import { Entity, PrimaryGeneratedColumn, Column, BeforeInsert, CreateDateColumn, UpdateDateColumn, OneToMany, JoinColumn, ManyToOne } from 'typeorm';
import * as bcrypt from 'bcrypt';

import { Role } from './role.entity'; 

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    user_id!: number;

    @Column({ type: 'varchar', length: 30})
    username!: string;

    @Column()
    password!: string;

    @Column({ type: 'varchar', length: 255 ,nullable: true, unique: true})
    email!: string;

    @Column({ type: 'varchar', length: 255, nullable: true })
    full_name!: string;

    @Column({ type: 'varchar', length: 15, nullable: true, unique: true })
    mobile!: string;

    @Column({ type: 'int', nullable: true })
    role_id!: number;
    
    @ManyToOne(() => Role)
    @JoinColumn({ name: 'role_id' })
    role!: Role;

    @CreateDateColumn({ type: 'datetime'})
    created_at!: Date;

    @UpdateDateColumn({ type: 'datetime' })
    updated_at!: Date;

    @BeforeInsert()
    async hashPassword() {
        this.password = await bcrypt.hash(this.password, 10);
    }
}