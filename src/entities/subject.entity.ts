import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

@Entity('subjects')
export class Subject {
  
  @PrimaryGeneratedColumn()
  subject_id!: number;

  @Column({ type: 'varchar', length: 255, })
  subject_name!: string;

  @CreateDateColumn({ type: 'datetime' })
  created_at!: Date;

}